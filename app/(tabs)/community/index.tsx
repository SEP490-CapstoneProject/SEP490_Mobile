import MediaGrid from "@/components/MediaGrid";
import { formatTimeAgo } from "@/services/setTime";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  CommunityPost,
  fetchCommunityPosts,
} from "../../../services/Comunity.api";

export default function Community() {
  const router = useRouter();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await fetchCommunityPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching community posts:", error);
      }
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cộng đồng</Text>
        <Pressable
          style={styles.titleIconBackground}
          onPress={() => router.push("/community/createPost")}
        >
          <Image
            source={require("../../../assets/myApp/edit1.png")}
            style={styles.titleIcon}
          />
        </Pressable>
      </View>
      {/* content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          posts.map((post) => (
            <View key={post.id} style={styles.contentContainer}>
              {/** header content **/}
              {post.author && (
                <View style={styles.headerContent}>
                  <View style={styles.headerContentLeft}>
                    <View style={styles.avataContainer}>
                      <Image
                        source={{ uri: post.author.avatar }}
                        style={styles.avata}
                      />
                      {post.author.role === "COMPANY" && (
                        <Image
                          source={require("../../../assets/myApp/checklist.png")}
                          style={styles.avataIcon}
                        />
                      )}
                    </View>

                    <View>
                      <Text style={styles.name}>{post.author.name}</Text>
                      <Text style={styles.time}>
                        {formatTimeAgo(post.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <Pressable>
                    <Image
                      source={require("../../../assets/myApp/option.png")}
                      style={styles.iconHeaderLeft}
                    />
                  </Pressable>
                </View>
              )}
              {/** body content */}
              <View>
                <Text style={styles.textContent}>{post.description}</Text>
                {post.portfolioId && (
                  <Pressable style={styles.linkContainer}>
                    <Image
                      source={require("../../../assets/myApp/link.png")}
                      style={styles.iconLinkbody}
                    />
                    <Text style={styles.textLinkBody}>Xem chi tiết</Text>
                  </Pressable>
                )}
                {post.media && post.media.length > 0 && (
                  <MediaGrid media={post.media} />
                )}
              </View>
              {/** footer content */}
              <View style={styles.footerContainer}>
                <View style={styles.favoriteCount}>
                  <Image
                    source={require("../../../assets/myApp/heartA (1).png")}
                    style={[
                      styles.footerIcon,
                      post.isFavorited ? { tintColor: "#FF4848" } : {},
                    ]}
                  />
                  <Text style={styles.textFavoriteCount}>
                    {post.favoriteCount}
                  </Text>
                </View>
                <Pressable
                  style={styles.favoriteCount}
                  onPress={() =>
                    router.push({
                      pathname: "/community/comment",
                      params: {
                        postId: post.id,
                      },
                    })
                  }
                >
                  <Image
                    source={require("../../../assets/myApp/message.png")}
                    style={styles.footerIcon}
                  />
                  <Text style={styles.textFavoriteCount}>
                    {post.commentCount}
                  </Text>
                </Pressable>
                <Image
                  source={require("../../../assets/myApp/bookmark.png")}
                  style={[
                    styles.footerIcon,
                    post.isSaved ? { tintColor: "#FFD700" } : {},
                  ]}
                />
                <Image
                  source={require("../../../assets/myApp/share-.png")}
                  style={[styles.footerIcon]}
                />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleIconBackground: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  titleIcon: {
    width: 20,
    height: 20,
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
