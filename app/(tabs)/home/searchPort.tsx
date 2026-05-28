import FollowModal from "@/components/FollowModal";
import { useLoading } from "@/components/LoadingContext";
import PortfolioRenderer from "@/components/portfolio/render/PortfolioRenderer";
import RatingModal from "@/components/RatingModal";
import {
  fetchCompanyPostsByCompany,
  fetchMatchPortfolios,
} from "@/services/companyPost.api";

import {
  createCompliment,
  followPortfolio,
  getMyCompliment,
  searchPortfolio,
  updateCompliment,
} from "@/services/portfolio.api";
import { shareContent } from "@/services/share";
import { getAuth } from "@/services/storage";
import { showError } from "@/utils/toast";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
export default function CandidateFilter() {
  const [expanded, setExpanded] = useState(true);
  const [searchType, setSearchType] = useState<"job" | "experience" | "skill">(
    "job",
  );
  const verticalRefs = useRef<(ScrollView | null)[]>([]);
  const [keyword, setKeyword] = useState("");
  const [auth, setAuth] = useState<any>(null);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const { showLoading, hideLoading } = useLoading();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(
    null,
  );
  const [followVisible, setFollowVisible] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<number | null>(
    null,
  );
  const [ratingLoading, setRatingLoading] = useState(false);
  const router = useRouter();
  const [jobPosts, setJobPosts] = useState<any[]>([]);
  const [showJobBox, setShowJobBox] = useState(false);

  const [ratingData, setRatingData] = useState({
    id: null as number | null,
    score: 0,
    content: "",
  });

  useEffect(() => {
    const fetchAuth = async () => {
      const data = await getAuth();
      setAuth(data);
    };

    fetchAuth();
  }, []);

  const handleSearch = async () => {
    try {
      showLoading();

      const block =
        searchType === "job"
          ? "INTRO"
          : searchType === "experience"
            ? "INTRO"
            : "SKILL";

      const res = await searchPortfolio(keyword, block);

      const data = res.items || [];

      setPortfolios(data);
      setExpanded(!expanded);
    } catch (err) {
      showError("Search error", err as string);
    } finally {
      hideLoading();
    }
  };

  const searchTypes = [
    {
      key: "job",
      label: "Vị trí",
      icon: "briefcase-outline",
    },
    // {
    //   key: "experience",
    //   label: "Kinh nghiệm",
    //   icon: "time-outline",
    // },
    {
      key: "skill",
      label: "Kỹ năng",
      icon: "code-slash-outline",
    },
  ];

  const clearAll = () => {
    setKeyword("");
    setSearchType("job");
  };

  const handleScroll = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const diff = Math.abs(offsetX - activeIndex * width);

    if (diff > width * 0.1 && isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.floor((offsetX + width * 0.1) / width);
    setActiveIndex(index);
    setIsExpanded(false);
    verticalRefs.current.forEach((ref) =>
      ref?.scrollTo({ y: 0, animated: false }),
    );
  };

  const handleOpenRating = async (portfolioId: number) => {
    try {
      setSelectedPortfolioId(portfolioId);

      setRatingData({
        id: null,
        score: 0,
        content: "",
      });

      setRatingVisible(true);
      setRatingLoading(true);

      const data = await getMyCompliment(portfolioId);

      let item = null;

      if (Array.isArray(data)) {
        item = data.find((x: any) => x.portfolioId === portfolioId);
      } else {
        item = data;
      }

      if (item) {
        setRatingData({
          id: item.id,
          score: Number(item.score),
          content: item.content || "",
        });
      }

      setRatingLoading(false);
    } catch (err) {
      showError("Rating error", err as string);
      setRatingLoading(false);
    }
  };

  const handleSubmitRating = async () => {
    try {
      if (!selectedPortfolioId) return;

      if (ratingData.id) {
        await updateCompliment(ratingData.id, {
          content: ratingData.content,
          score: ratingData.score,
        });
      } else {
        await createCompliment({
          portfolioId: selectedPortfolioId,
          content: ratingData.content,
          score: ratingData.score,
        });
      }

      setRatingVisible(false);
    } catch (err) {
      console.log("Submit rating error:", err);
    }
  };

  const handleFollow = async ({
    categoryId,
    level,
  }: {
    categoryId: number;
    level: string;
  }) => {
    try {
      if (!selectedPortfolio) return;

      setPortfolios((prev) =>
        prev.map((p) =>
          p.portfolioId === selectedPortfolio
            ? {
                ...p,
                isFollowed: true,
                interestLevel: level,
              }
            : p,
        ),
      );

      await followPortfolio(selectedPortfolio, level, categoryId);
    } catch (err) {
      showError("Follow error", err as string);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Pressable style={styles.header} onPress={() => setExpanded(!expanded)}>
          <View style={styles.headerLeft}>
            <Ionicons name="options-outline" size={18} color="#3B82F6" />

            <Text style={styles.title}>Bộ lọc ứng viên</Text>
          </View>

          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={18}
            color="#555"
          />
        </Pressable>

        {expanded && (
          <View style={styles.content}>
            <Text style={styles.label}>Chọn hình thức tìm kiếm</Text>

            <View style={styles.typeList}>
              {searchTypes.map((item) => {
                const isActive = searchType === item.key;

                return (
                  <Pressable
                    key={item.key}
                    style={[styles.typeItem, isActive && styles.typeItemActive]}
                    onPress={() =>
                      setSearchType(item.key as "job" | "experience" | "skill")
                    }
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={16}
                      color={isActive ? "#fff" : "#3B82F6"}
                    />

                    <Text
                      style={[
                        styles.typeText,
                        isActive && styles.typeTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.label}>
              {searchType === "job" && "Vị trí công việc"}
              {searchType === "experience" && "Kinh nghiệm"}
              {searchType === "skill" && "Kỹ năng"}
            </Text>

            <TextInput
              placeholder={
                searchType === "job"
                  ? "Nhập vị trí..."
                  : searchType === "experience"
                    ? "Ví dụ: 2 năm..."
                    : "Nhập kỹ năng..."
              }
              value={keyword}
              onChangeText={setKeyword}
              style={styles.input}
              placeholderTextColor="#999"
            />

            {/* Button */}
            <Pressable style={styles.applyBtn} onPress={handleSearch}>
              <Ionicons name="search" size={18} color="#fff" />

              <Text style={styles.applyText}>Áp dụng bộ lọc</Text>
            </Pressable>

            <Pressable onPress={clearAll}>
              <Text style={styles.clearText}>Xóa tất cả bộ lọc</Text>
            </Pressable>
            {/* AI Search */}
            <View
              style={[
                styles.aiBox,
                auth?.role === 1 && {
                  opacity: 0.5,
                },
              ]}
            >
              <View style={styles.aiHeader}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Ionicons name="sparkles" size={18} color="#8B5CF6" />

                  <Text style={styles.aiTitle}>Tìm kiếm bằng AI</Text>
                </View>

                <View style={styles.aiBadge}>
                  <Text style={styles.aiBadgeText}>AI</Text>
                </View>
              </View>

              {auth?.role === 1 ? (
                <Text style={styles.aiDescription}>
                  Tính năng này chỉ dành cho nhà tuyển dụng.
                </Text>
              ) : (
                <>
                  <Text style={styles.aiDescription}>
                    AI sẽ phân tích bài đăng tuyển dụng và tự động tìm portfolio
                    phù hợp.
                  </Text>

                  <Pressable
                    style={styles.aiButton}
                    onPress={async () => {
                      try {
                        const res = await fetchCompanyPostsByCompany(
                          auth.companyId,
                          "",
                          100,
                        );

                        setJobPosts(res.items || []);
                        setShowJobBox(true);
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    <Ionicons name="sparkles" size={18} color="#fff" />

                    <Text style={styles.aiButtonText}>
                      Chọn bài đăng tuyển dụng
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        )}
      </View>

      {portfolios.length <= 0 && keyword !== "" && (
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 10,
            padding: 20,
            borderRadius: 18,
            alignItems: "center",
          }}
        >
          <Ionicons name="search-outline" size={42} color="#9CA3AF" />

          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              fontWeight: "700",
              color: "#374151",
            }}
          >
            Không tìm thấy ứng viên
          </Text>

          <Text
            style={{
              marginTop: 6,
              fontSize: 13,
              color: "#6B7280",
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Không có portfolio nào phù hợp với "{keyword}"
          </Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <View style={styles.rankBannerWrapper}></View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          directionalLockEnabled
          onScroll={handleScroll}
          onMomentumScrollEnd={(e) => {
            handleScrollEnd(e);

            const index = Math.round(e.nativeEvent.contentOffset.x / width);
          }}
          scrollEventThrottle={32}
        >
          {portfolios.map((portfolio, index) => (
            <View key={portfolio.portfolioId} style={styles.page}>
              <ScrollView
                ref={(ref) => {
                  verticalRefs.current[index] = ref;
                }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 100 }}
              >
                <PortfolioRenderer
                  blocks={portfolio.blocks}
                  rank={Number(portfolio.ranking?.rankPosition)}
                />
              </ScrollView>
              <LinearGradient
                colors={[
                  "rgba(0,0,0,0.3)",
                  "rgba(0,0,0,0.3)",
                  "rgba(0,0,0,0.3)",
                  "rgba(0,0,0,0.3)",
                ]}
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 20,
                  right: 20,
                  borderRadius: 20,
                }}
              >
                <View style={styles.actionBar}>
                  {auth?.role === 2 && (
                    <Pressable
                      onPress={() => handleOpenRating(portfolio.portfolioId)}
                    >
                      <Image
                        source={require("../../../assets/myApp/rating.png")}
                        style={styles.iconRating}
                      />
                    </Pressable>
                  )}
                  {auth?.role === 2 && (
                    <Pressable
                      onPress={() => {
                        setSelectedPortfolio(portfolio.portfolioId);
                        setFollowVisible(true);
                      }}
                    >
                      <Image
                        source={require("../../../assets/myApp/save.png")}
                        style={[
                          styles.icon,
                          portfolio.isSaved ? { tintColor: "#FFD700" } : {},
                        ]}
                      />
                    </Pressable>
                  )}
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: `/(tabs)/profile/viewPortfolio`,
                        params: {
                          portId: portfolio.portfolioId,
                        },
                      })
                    }
                    style={styles.detailBtn}
                  >
                    <Ionicons name="eye-outline" size={24} color="#3B82F6" />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      shareContent(
                        `https://skillsnap.io/portfolio/${portfolio.portfolioId}`,
                      )
                    }
                  >
                    <Image
                      source={require("../../../assets/myApp/share_black.png")}
                      style={styles.icon}
                    />
                  </Pressable>
                </View>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
      </View>
      {showJobBox && (
        <View style={styles.overlay}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setShowJobBox(false)}
          />

          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Chọn bài đăng tuyển dụng</Text>

                <Text style={styles.modalSub}>
                  AI sẽ phân tích bài đăng để tìm ứng viên phù hợp
                </Text>
              </View>

              <Pressable onPress={() => setShowJobBox(false)}>
                <Ionicons name="close" size={22} color="#666" />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
            >
              {jobPosts.map((item) => (
                <Pressable
                  key={item.postId}
                  style={styles.jobCard}
                  onPress={async () => {
                    try {
                      showLoading();

                      const res = await fetchMatchPortfolios(item.postId);

                      setPortfolios(res.items || []);

                      setShowJobBox(false);
                      setExpanded(!expanded);
                    } catch (err) {
                      console.log(err);
                    } finally {
                      hideLoading();
                    }
                  }}
                >
                  <View style={styles.jobTop}>
                    <View style={styles.jobIcon}>
                      <Ionicons name="briefcase" size={18} color="#2563EB" />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.jobTitle}>{item.position}</Text>

                      <Text style={styles.jobCompany}>{item.companyName}</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={18} color="#999" />
                  </View>

                  <View style={styles.jobInfoRow}>
                    <View style={styles.infoTag}>
                      <Ionicons name="cash-outline" size={14} color="#2563EB" />

                      <Text style={styles.infoText}>{item.salary}</Text>
                    </View>

                    <View style={styles.infoTag}>
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color="#2563EB"
                      />

                      <Text style={styles.infoText}>{item.address}</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      <RatingModal
        visible={ratingVisible}
        ratingData={ratingData}
        setRatingData={setRatingData}
        loading={ratingLoading}
        onClose={() => setRatingVisible(false)}
        onSubmit={handleSubmitRating}
      />
      <FollowModal
        visible={followVisible}
        onClose={() => setFollowVisible(false)}
        onSubmit={handleFollow}
      />
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

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  content: {
    marginTop: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
    color: "#555",
  },

  typeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  typeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },

  typeItemActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },

  typeText: {
    color: "#2563EB",
    fontWeight: "500",
    fontSize: 13,
  },

  typeTextActive: {
    color: "#fff",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },

  applyBtn: {
    marginTop: 16,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  applyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  clearText: {
    textAlign: "center",
    marginTop: 12,
    color: "#888",
    fontSize: 13,
  },

  page: {
    width,
    flex: 1,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    alignItems: "center",
  },
  icon: {
    width: 27,
    height: 27,
  },
  iconRating: {
    width: 40,
    height: 40,
  },
  rankBannerWrapper: {},

  pressableWrap: {
    borderRadius: 20,
  },

  rankBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 7,

    shadowColor: "#FF5F00",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  bannerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  bannerSub: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
  },

  bannerBtn: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  aiBox: {
    marginTop: 16,
    backgroundColor: "#F5F3FF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },

  aiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  aiTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#6D28D9",
  },

  aiBadge: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  aiBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  aiDescription: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: "#666",
  },

  aiButton: {
    marginTop: 14,
    backgroundColor: "#7C3AED",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  aiButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  jobBox: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  jobBoxTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  jobItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  jobTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  jobCompany: {
    marginTop: 4,
    color: "#666",
    fontSize: 12,
  },

  jobSalary: {
    marginTop: 4,
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 12,
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
  detailBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 10,
    borderRadius: 999,
  },
});
