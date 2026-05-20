import { useConfirm } from "@/components/ConfirmContext";
import CustomLoading from "@/components/CustomLoading";
import MediaGrid from "@/components/MediaGrid";
import { fetchSavedPosts } from "@/services/careManagement.api";
import {
  deletePost,
  likePost,
  reportPost,
  savePost,
  unlikePost,
  unsavePost,
} from "@/services/Comunity.api";
import { realtimeService } from "@/services/realtimeService";

import { formatTimeAgo } from "@/services/setTime";
import { shareContent } from "@/services/share";
import { getAuth } from "@/services/storage";
import { usePostStore } from "@/utils/postStore";
import { showError, showSuccess } from "@/utils/toast";
import { FontAwesome } from "@expo/vector-icons";
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

export default function CareCommunityScreen() {
  const router = useRouter();
  const { profilePosts, setProfilePosts, toggleSave } = usePostStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateFavoriteRealtime } = usePostStore();
  const { toggleFavorite } = usePostStore();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [reportVisible, setReportVisible] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const { showConfirm } = useConfirm();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const user = await getAuth();
      const userId = user?.id || null;
      setCurrentUserId(userId);
      try {
        const fetchedPosts = await fetchSavedPosts();
        setProfilePosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching community posts:", error);
      }
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  const handleSave = async (postId: number) => {
    const post = profilePosts.find((p) => p.id === postId);
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
      if (!profilePosts.find((p) => p.id === postId)?.isFavorited) {
        await likePost(postId);
      } else {
        await unlikePost(postId);
      }
    } catch (err) {
      toggleFavorite(postId);
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      showConfirm({
        title: "Xóa bài đăng",
        message: "Bạn có chắc muốn xóa không?",
        onConfirm: async () => {
          const res = await deletePost(postId);
          if (res) {
            showSuccess("Xóa bài viết", "Bài viết đã được xóa thành công.");
          } else {
            showError(
              "Xóa bài viết",
              "Xóa bài viết thất bại. Vui lòng thử lại.",
            );
          }
        },
      });
    } catch (err) {
      console.log(err);
      showError("Xóa bài viết", "Xóa bài viết thất bại. Vui lòng thử lại.");
    }
  };
  return (
    <View style={styles.container}>
      {/* content */}
      {isLoading ? (
        <CustomLoading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {profilePosts.map((post) => (
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
                          source={require("../../../../../assets/myApp/checklist.png")}
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
                  <Pressable
                    onPress={() => {
                      setSelectedPost(post);
                      setMenuVisible(true);
                    }}
                  >
                    <Image
                      source={require("../../../../../assets/myApp/option.png")}
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
                      source={require("../../../../../assets/myApp/link.png")}
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
                <Pressable
                  style={styles.favoriteCount}
                  onPress={() => handleLike(post.id)}
                >
                  <Image
                    source={require("../../../../../assets/myApp/heartA (1).png")}
                    style={[
                      styles.footerIcon,
                      post.isFavorited ? { tintColor: "#FF4848" } : {},
                    ]}
                  />
                  <Text style={styles.textFavoriteCount}>
                    {post.favoriteCount}
                  </Text>
                </Pressable>
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
                    source={require("../../../../../assets/myApp/message.png")}
                    style={styles.footerIcon}
                  />
                  <Text style={styles.textFavoriteCount}>
                    {post.commentCount}
                  </Text>
                </Pressable>
                <Pressable onPress={() => handleSave(post.id)}>
                  {post.isSaved === true ? (
                    <FontAwesome name="bookmark" size={24} color="#FFD700" />
                  ) : (
                    <FontAwesome name="bookmark" size={24} color="#cbd2dc" />
                  )}
                </Pressable>
                <Pressable
                  onPress={() =>
                    shareContent(`https://skillsnap.io/post/${post.id}`)
                  }
                >
                  <Image
                    source={require("../../../../../assets/myApp/share-.png")}
                    style={[styles.footerIcon]}
                  />
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {menuVisible && (
        <View style={styles.overlay}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setMenuVisible(false)}
          />

          <View style={styles.bottomSheet}>
            {selectedPost?.author?.id === currentUserId ? (
              <Pressable
                style={styles.menuItem}
                onPress={() => {
                  handleDelete(selectedPost.id);
                  setMenuVisible(false);
                }}
              >
                <Image
                  source={require("../../../../../assets/myApp/trash.png")}
                  style={styles.iconHeaderLeft}
                />
                <Text style={{ color: "red" }}>Xóa bài viết</Text>
              </Pressable>
            ) : (
              <></>
            )}

            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setTimeout(() => {
                  setReportVisible(true);
                }, 200);
              }}
            >
              <Image
                source={require("../../../../../assets/myApp/warning1.png")}
                style={styles.iconHeaderLeft}
              />
              <Text>Báo cáo bài viết</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => setMenuVisible(false)}
            >
              <Text>Hủy</Text>
            </Pressable>
          </View>
        </View>
      )}

      {reportVisible && (
        <View style={styles.overlay}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setReportVisible(false)}
          />

          <View style={styles.bottomSheet}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
            >
              Chọn lý do báo cáo
            </Text>

            {[
              { label: "Spam / Nội dung rác", value: "spam" },
              { label: "Quấy rối / Đả kích", value: "harassment" },
              { label: "Ngôn từ thù ghét", value: "hate_speech" },
              { label: "Nội dung không phù hợp", value: "inappropriate" },
              { label: "Lý do khác", value: "other" },
            ].map((item) => (
              <Pressable
                key={item.value}
                style={styles.menuItem}
                onPress={() => setReportReason(item.value)}
              >
                <Text
                  style={{
                    color: reportReason === item.value ? "#2563EB" : "#000",
                    fontWeight: reportReason === item.value ? "bold" : "normal",
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                marginHorizontal: 40,
              }}
            >
              <Pressable
                style={[styles.menuItem]}
                onPress={async () => {
                  try {
                    await reportPost(selectedPost.id, reportReason);

                    showSuccess(
                      "Đã gửi báo cáo",
                      "Cảm ơn bạn đã giúp chúng tôi giữ cho cộng đồng an toàn và lành mạnh.",
                    );
                    setReportVisible(false);
                  } catch (err) {
                    showError(
                      "Báo cáo thất bại",
                      "Đã có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại.",
                    );
                  }
                }}
              >
                <Text style={{ color: "#2563EB", textAlign: "center" }}>
                  Gửi báo cáo
                </Text>
              </Pressable>

              <Pressable
                style={styles.menuItem}
                onPress={() => setReportVisible(false)}
              >
                <Text>Hủy</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
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

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },

  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },

  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
