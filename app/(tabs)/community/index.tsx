import MediaGrid from "@/components/MediaGrid";
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

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);

    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "Vừa xong";
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;
    if (diffDay === 1) return "Hôm qua";
    if (diffDay < 7) return `${diffDay} ngày trước`;

    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cộng đồng</Text>
        <View style={styles.titleIconBackground}>
          <Image
            source={require("../../../assets/myApp/edit1.png")}
            style={styles.titleIcon}
          />
        </View>
      </View>
      {/* content */}
      <ScrollView>
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
                {post.link && (
                  <Pressable style={styles.linkContainer}>
                    <Image
                      source={require("../../../assets/myApp/link.png")}
                      style={styles.iconLinkbody}
                    />
                    <Text style={styles.textLinkBody}>Xem chi tiết</Text>
                  </Pressable>
                )}
                {post.media.length > 0 && <MediaGrid media={post.media} />}
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
                  <Text style={styles.textFavoriteCount}>{post.favoriteCount}</Text>
                </View>
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
    marginTop: 40,
    position: "relative",
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
    width: 30,
    height: 30,
    tintColor: "#cbd2dcff",
  },
  favoriteCount: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  textFavoriteCount:{
    color: "#6B7280",
    fontSize: 13,
  }
});
