import MediaGrid from "@/components/MediaGrid";
import { getAuth } from "@/services/auth.api";
import {
  CommunityPost,
  fetchCommunityPostsByUser,
} from "@/services/Comunity.api";
import { formatTimeAgo } from "@/services/setTime";
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

export default function CommunityManager() {
  const router = useRouter();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<"NEWEST" | "OLDEST">("NEWEST");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const auth = await getAuth();
      setUser(auth);
      if (auth?.userId) {
        const posts = await fetchCommunityPostsByUser(auth.userId);
        setPosts(posts);
      }

      setIsLoading(false);
    };

    loadData();
  }, []);

  const displayPosts = [...posts].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();

    return sortOrder === "NEWEST" ? timeB - timeA : timeA - timeB;
  });

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../../assets/myApp/arrow.png")}
            style={styles.headerIcon}
          />
        </Pressable>
        <Text style={styles.title}>Quản lý bài đăng cộng đồng</Text>
      </View>
      {/** body */}
      <View>
        <View
          style={{
            flexDirection: "row",
            gap: 100,
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Bạn có {posts.length} bài đăng
          </Text>
          <View style={{ position: "relative" }}>
            <View style={styles.sortWrapper}>
              <Image
                source={require("../../../../assets/myApp/sort.png")}
                style={styles.sortIcon}
              />
              <Pressable
                style={styles.selectBox}
                onPress={() => setIsOpen(!isOpen)}
              >
                <Text style={styles.selectText}>
                  {sortOrder === "NEWEST" ? "Mới nhất" : "Cũ nhất"}
                </Text>
              </Pressable>

              {/* DROPDOWN */}
              {isOpen && (
                <View style={styles.dropdown}>
                  <Pressable
                    style={styles.option}
                    onPress={() => {
                      setSortOrder("NEWEST");
                      setIsOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        sortOrder === "NEWEST" && styles.activeText,
                      ]}
                    >
                      Mới nhất
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.option}
                    onPress={() => {
                      setSortOrder("OLDEST");
                      setIsOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        sortOrder === "OLDEST" && styles.activeText,
                      ]}
                    >
                      Cũ nhất
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>

        {/** view post content */}
        <View style={{ marginBottom: 192 }}>
          <FlatList
            data={displayPosts}
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
                            source={require("../../../../assets/myApp/checklist.png")}
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
                        source={require("../../../../assets/myApp/option.png")}
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
                        source={require("../../../../assets/myApp/link.png")}
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
                  <View style={styles.favoriteCount}>
                    <Image
                      source={require("../../../../assets/myApp/heartA (1).png")}
                      style={[
                        styles.footerIcon,
                        item.isFavorited ? { tintColor: "#FF4848" } : {},
                      ]}
                    />
                    <Text style={styles.textFavoriteCount}>
                      {item.favoriteCount}
                    </Text>
                  </View>
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
                      source={require("../../../../assets/myApp/message.png")}
                      style={styles.footerIcon}
                    />
                    <Text style={styles.textFavoriteCount}>
                      {item.commentCount}
                    </Text>
                  </Pressable>
                  <Image
                    source={require("../../../../assets/myApp/bookmark.png")}
                    style={[
                      styles.footerIcon,
                      item.isSaved ? { tintColor: "#FFD700" } : {},
                    ]}
                  />
                  <Image
                    source={require("../../../../assets/myApp/share-.png")}
                    style={[styles.footerIcon]}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 13,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1.2,
    paddingBottom: 15,
    marginTop: 30,
    gap: 20,
  },
  headerIcon: {
    width: 23,
    height: 23,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  sortWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  sortIcon: {
    width: 25,
    height: 25,
    tintColor: "#2563EB",
  },

  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  selectText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2563EB",
  },

  dropdown: {
    position: "absolute",
    top: 34,
    right: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: 120,
    zIndex: 1000,
    elevation: 5,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  optionText: {
    fontSize: 14,
    color: "#111",
  },

  activeText: {
    color: "#2563EB",
    fontWeight: "600",
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
