import MediaGrid from "@/components/MediaGrid";
import {
  fetchCommunityPostsByUser,
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from "@/services/Comunity.api";
import { realtimeService } from "@/services/realtimeService";
import { formatTimeAgo } from "@/services/setTime";
import { shareContent } from "@/services/share";
import { usePostStore } from "@/utils/postStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Community({ userId }: { userId: number }) {
  const { posts, setPosts, toggleSave } = usePostStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateFavoriteRealtime } = usePostStore();
  const { toggleFavorite } = usePostStore();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const posts = await fetchCommunityPostsByUser(userId);
      setPosts(posts);

      setLoading(false);
    };

    loadData();
  }, []);

  const handleSave = async (postId: number) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const wasSaved = post.isSaved;

    toggleSave(postId);

    try {
      if (wasSaved) {
        await unsavePost(postId);
      } else {
        await savePost(postId);
      }
    } catch (err) {
      console.log(err);
      toggleSave(postId);
    }
  };

  useEffect(() => {
    const handler = (data: any) => {
      updateFavoriteRealtime(
        data.postId,
        Number(data.userId),
        data.action,
        data.newFavoriteCount,
      );
    };

    realtimeService.onFavorite(handler);

    return () => {
      realtimeService.offFavorite(handler);
    };
  }, []);

  const handleLike = async (postId: number) => {
    toggleFavorite(postId);

    try {
      if (!posts.find((p) => p.id === postId)?.isFavorited) {
        await likePost(postId);
      } else {
        await unlikePost(postId);
      }
    } catch (err) {
      toggleFavorite(postId);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 50 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.contentContainer}>
              {/** header content **/}
              {item.author && (
                <View style={styles.headerContent}>
                  <View style={styles.headerContentLeft}>
                    <View style={styles.avataContainer}>
                      <Image
                        source={{ uri: item.author.avatar }}
                        style={styles.avata}
                      />
                      {item.author.role === "COMPANY" && (
                        <Image
                          source={require("../../assets/myApp/checklist.png")}
                          style={styles.avataIcon}
                        />
                      )}
                    </View>

                    <View>
                      <Text style={styles.name}>{item.author.name}</Text>
                      <Text style={styles.time}>
                        {formatTimeAgo(item.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <Pressable>
                    <Image
                      source={require("../../assets/myApp/option.png")}
                      style={styles.iconHeaderLeft}
                    />
                  </Pressable>
                </View>
              )}
              {/** body content */}
              <View>
                <Text style={styles.textContent}>{item.description}</Text>
                {item.portfolioId && (
                  <Pressable style={styles.linkContainer}>
                    <Image
                      source={require("../../assets/myApp/link.png")}
                      style={styles.iconLinkbody}
                    />
                    <Text style={styles.textLinkBody}>Xem chi tiết</Text>
                  </Pressable>
                )}
                {item.media && item.media.length > 0 && (
                  <MediaGrid media={item.media} />
                )}
              </View>
              {/** footer content */}
              <View style={styles.footerContainer}>
                <Pressable
                  style={styles.favoriteCount}
                  onPress={() => handleLike(item.id)}
                >
                  <Image
                    source={require("../../assets/myApp/heartA (1).png")}
                    style={[
                      styles.footerIcon,
                      item.isFavorited ? { tintColor: "#FF4848" } : {},
                    ]}
                  />
                  <Text style={styles.textFavoriteCount}>
                    {item.favoriteCount}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.favoriteCount}
                  onPress={() =>
                    router.push({
                      pathname: "/community/comment",
                      params: {
                        postId: item.id,
                      },
                    })
                  }
                >
                  <Image
                    source={require("../../assets/myApp/message.png")}
                    style={styles.footerIcon}
                  />
                  <Text style={styles.textFavoriteCount}>
                    {item.commentCount}
                  </Text>
                </Pressable>
                <Pressable onPress={() => handleSave(item.id)}>
                  <Image
                    source={require("../../assets/myApp/bookmark.png")}
                    style={[
                      styles.footerIcon,
                      item.isSaved ? { tintColor: "#FFD700" } : {},
                    ]}
                  />
                </Pressable>
                <Pressable
                  onPress={() =>
                    shareContent(`https://skillsnap.io/post/${item.id}`)
                  }
                >
                  <Image
                    source={require("../../assets/myApp/share-.png")}
                    style={[styles.footerIcon]}
                  />
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  contentContainer: {
    width: "100%",
    height: "auto",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopWidth: 2,
    borderTopColor: "#E2E8F0",
    borderBottomWidth: 2,
    borderBottomColor: "#E2E8F0",
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  headerContentLeft: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 5,
  },
  avataContainer: {
    position: "relative",
  },
  avata: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avataIcon: {
    width: 15,
    height: 15,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#6B7280",
  },
  iconHeaderLeft: {
    width: 20,
    height: 20,
  },
  textContent: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
  },
  linkContainer: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  iconLinkbody: {
    width: 15,
    height: 15,
  },
  textLinkBody: {
    fontSize: 15,
    color: "#3B82F6",
  },
  footerContainer: {
    borderTopColor: "#E2E8F0",
    borderTopWidth: 1,
    marginTop: 15,
    flexDirection: "row",
    gap: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  footerIcon: {
    width: 25,
    height: 25,
    tintColor: "#cbd2dcff",
  },
  favoriteCount: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  textFavoriteCount: {
    color: "#6B7280",
    fontSize: 13,
  },
});
