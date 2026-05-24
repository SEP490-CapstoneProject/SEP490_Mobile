import { useLoading } from "@/components/LoadingContext";
import {
  saveJob,
  searchCompanyPosts,
  unSaveJob,
} from "@/services/companyPost.api";
import { fetchPortfolioMe, getMatchJobs } from "@/services/portfolio.api";
import { shareContent } from "@/services/share";
import { useJobStore } from "@/utils/jobPostStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function JobFilter() {
  const [expanded, setExpanded] = useState(true);
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const { showLoading, hideLoading } = useLoading();
  const [loading, setLoading] = useState(false);
  const [showPortfolioBox, setShowPortfolioBox] = useState(false);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<any>(null);
  const searchJobs = useJobStore((s) => s.searchJobs);
  const setSearchJobs = useJobStore((s) => s.setSearchJobs);

  const toggleSaveSearch = useJobStore((s) => s.toggleSaveSearch);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSearch = async () => {
    try {
      showLoading();

      const data = await searchCompanyPosts(keyword);

      setSearchJobs(data?.items || data?.data || data || []);
      setExpanded(false);
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
    }
  };

  const handleOpenAIBox = async () => {
    try {
      showLoading();
      setShowPortfolioBox(!showPortfolioBox);

      if (!showPortfolioBox) {
        const data = await fetchPortfolioMe();

        setPortfolios(data?.items || data?.data || data || []);
      }
      hideLoading();
    } catch (err) {
      hideLoading();
    }
  };

  const handleSearchAI = async (portfolioId: number) => {
    try {
      setAiLoading(true);
      showLoading();

      const data = await getMatchJobs(portfolioId);

      setSearchJobs(data?.items || data?.data || data || []);

      setShowPortfolioBox(false);
      setExpanded(false);
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
      setAiLoading(false);
    }
  };

  const handleSaveJob = async (postId: number, isSaved: boolean) => {
    toggleSaveSearch(postId);

    try {
      if (isSaved) {
        await unSaveJob(postId);
      } else {
        await saveJob(postId);
      }
    } catch (error) {
      toggleSaveSearch(postId);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Pressable style={styles.header} onPress={() => setExpanded(!expanded)}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Ionicons name="options-outline" size={18} color="#3B82F6" />

            <Text style={styles.title}>Tìm bài đăng tuyển dụng</Text>
          </View>

          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={18}
            color="#555"
          />
        </Pressable>

        {expanded && (
          <View style={{ marginTop: 10 }}>
            <View style={styles.divider} />

            <Text style={styles.label}>Tìm kiếm</Text>

            <TextInput
              placeholder="Nhập từ khóa..."
              value={keyword}
              onChangeText={setKeyword}
              style={styles.input}
              placeholderTextColor="#000000"
            />

            <Pressable style={styles.applyBtn} onPress={handleSearch}>
              <Ionicons name="search" size={18} color="#fff" />

              <Text style={styles.applyText}>Tìm kiếm</Text>
            </Pressable>

            <View style={styles.aiSearchBox}>
              <View style={styles.aiTop}>
                <View style={styles.aiIconWrap}>
                  <Ionicons name="sparkles-outline" size={20} color="#8B5CF6" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.aiTitle}>Tìm kiếm bằng AI</Text>

                  <Text style={styles.aiDesc}>
                    AI phân tích portfolio để gợi ý công việc phù hợp nhất với
                    bạn.
                  </Text>
                </View>
              </View>

              <Pressable style={styles.aiBtn} onPress={handleOpenAIBox}>
                <Ionicons name="sparkles-outline" size={18} color="#fff" />

                <Text style={styles.applyText}>Tìm kiếm bằng AI</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      {showPortfolioBox && (
        <View style={styles.overlay}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setShowPortfolioBox(false)}
          />

          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Chọn Portfolio</Text>

                <Text style={styles.modalSub}>
                  AI sẽ phân tích portfolio để tìm việc phù hợp
                </Text>
              </View>

              <Pressable onPress={() => setShowPortfolioBox(false)}>
                <Ionicons name="close" size={22} color="#666" />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
            >
              {portfolios.map((item) => {
                const introBlock = item.blocks?.find(
                  (b: any) => b.type === "INTRO",
                );

                const introData = introBlock?.data;

                return (
                  <Pressable
                    key={item.portfolioId}
                    style={styles.jobCard}
                    onPress={() => handleSearchAI(item.portfolioId)}
                  >
                    <View style={styles.jobTop}>
                      <Image
                        source={{
                          uri: introData?.avatar || "https://i.pravatar.cc/150",
                        }}
                        style={styles.avatar}
                      />

                      <View style={{ flex: 1 }}>
                        <Text style={styles.jobTitle}>
                          {item.portfolioName || item.title || "Portfolio"}
                        </Text>

                        <Text style={styles.userName}>
                          {introData?.name || "Unknown"}
                        </Text>

                        <Text style={styles.jobCompany}>
                          {introData?.studyField || "Chưa cập nhật study field"}
                        </Text>
                      </View>

                      <Ionicons name="chevron-forward" size={18} color="#999" />
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}

      {searchJobs.length <= 0 && keyword !== "" && (
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 14,
            padding: 16,
            borderRadius: 14,
            alignItems: "center",
          }}
        >
          <Ionicons name="search-outline" size={40} color="#9CA3AF" />

          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              fontWeight: "700",
              color: "#374151",
            }}
          >
            Không tìm thấy kết quả
          </Text>

          <Text
            style={{
              marginTop: 6,
              fontSize: 13,
              color: "#6B7280",
              textAlign: "center",
            }}
          >
            Không có bài đăng nào phù hợp với "{keyword}"
          </Text>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
        {searchJobs.map((job, index) => (
          <View key={job.postId} style={styles.contentcontainer}>
            {job.mediaType === "image" ? (
              <Image
                source={{ uri: job.mediaUrl }}
                style={styles.media}
                resizeMode="cover"
              />
            ) : (
              <></>
            )}
            <LinearGradient
              colors={[
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0.3)",
                "rgba(0,0,0,0.4)",
                "rgba(0,0,0,0.5)",
              ]}
              style={styles.gradient}
            />
            <View style={styles.content}>
              <View style={{ flexDirection: "row", gap: 10, flex: 1 }}>
                <Image
                  source={{ uri: job.companyAvatar }}
                  style={styles.avata}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.position}>{job.position}</Text>
                  <Text style={styles.name}>{job.companyName}</Text>

                  <View style={{ marginTop: 17 }}>
                    <Image
                      source={require("../../../assets/myApp/maps-and-flags1.png")}
                      style={styles.iconLefft}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.contentLeft}
                    >
                      {job.address}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={require("../../../assets/myApp/money1.png")}
                      style={styles.iconLefft}
                    />
                    <Text style={styles.contentLeft}>{job.salary}</Text>
                  </View>
                  <View>
                    <Image
                      source={require("../../../assets/myApp/clock.png")}
                      style={styles.iconLefft}
                    />
                    <Text style={styles.contentLeft}>{job.employmentType}</Text>
                  </View>
                  <Pressable
                    style={styles.letDetail}
                    onPress={() =>
                      router.push({
                        pathname: "../home/detail",
                        params: { postId: job.postId },
                      })
                    }
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 11 }}>
                      Xem chi tiết
                    </Text>
                    <Image
                      source={require("../../../assets/myApp/upper-right-arrow.png")}
                      style={{ width: 15, height: 15 }}
                    />
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  marginRight: 9,
                }}
              >
                <Pressable
                  onPress={() => handleSaveJob(job.postId, job.isSaved)}
                >
                  <Image
                    source={require("../../../assets/myApp/bookmark.png")}
                    style={[
                      styles.iconRight,
                      job.isSaved ? { tintColor: "#FFD700" } : {},
                    ]}
                  />
                </Pressable>
                <Pressable
                  onPress={() =>
                    shareContent(`https://skillsnap.io/job/${job.postId}`)
                  }
                >
                  <Image
                    source={require("../../../assets/myApp/share-.png")}
                    style={styles.iconRight}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  search: {
    borderRadius: 16,
    margin: 16,
    padding: 12,
    backgroundColor: "#EFF6FF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginTop: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#555",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },

  applyBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  aiBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7C3AED",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  applyText: {
    color: "#fff",
    fontWeight: "600",
    gap: 6,
    marginLeft: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },

  contentcontainer: {
    width: "94%",
    height: 300,
    backgroundColor: "#EFF6FF",
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
  },

  content: {
    position: "absolute",
    bottom: -40,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  media: {
    width: "100%",
    height: "100%",
  },

  avata: {
    width: 55,
    height: 55,
    borderRadius: 32.5,
    marginLeft: 5,
  },
  position: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  iconLefft: {
    width: 14,
    height: 14,
    marginTop: 5,
  },

  contentLeft: {
    color: "#FFFFFF",
    fontSize: 13,
    marginLeft: 20,
    marginTop: -18,
  },

  letDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(226, 232, 240, 0.3)",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 100,
    justifyContent: "space-between",
  },

  iconRight: {
    width: 27,
    height: 27,
    marginBottom: 70,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  modalBox: {
    width: "92%",
    maxHeight: "75%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    elevation: 12,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  modalSub: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 13,
  },

  jobCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },

  jobTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  jobIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  jobTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  jobCompany: {
    marginTop: 4,
    color: "#666",
    fontSize: 12,
  },

  jobInfoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },

  infoTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  infoText: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "600",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 999,
    marginRight: 12,
  },

  userName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginTop: 2,
  },
  aiSearchBox: {
    marginTop: 16,
    backgroundColor: "#F5F3FF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },

  aiTop: {
    flexDirection: "row",
    gap: 12,
  },

  aiIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#EDE9FE",
    justifyContent: "center",
    alignItems: "center",
  },

  aiTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5B21B6",
  },

  aiDesc: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: "#6B7280",
  },

  aiFeatureRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },

  aiFeature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  aiFeatureText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7C3AED",
  },
});
