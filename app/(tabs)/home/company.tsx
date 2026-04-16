import CustomLoading from "@/components/CustomLoading";
import PortfolioRenderer from "@/components/portfolio/render/portfolioRenderer";
import RatingModal from "@/components/RatingModal";
import { getAuth } from "@/services/auth.api";

import {
  createCompliment,
  fetchPortfolio,
  getMyCompliment,
  updateCompliment,
} from "@/services/portfolio.api";
import { shareContent } from "@/services/share";
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
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");

export default function Home() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const verticalRefs = useRef<(ScrollView | null)[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [auth, setAuth] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(
    null,
  );

  const [ratingData, setRatingData] = useState({
    id: null as number | null,
    score: 0,
    content: "",
  });
  const [ratingLoading, setRatingLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      getAuth().then(setAuth);
      try {
        setLoading(true);
        const data = await fetchPortfolio(1, 10, false);
        setPortfolios(data);
        setLoading(false);
        setPage(1);
        setHasMore(data.length === 10);
      } catch (e) {
        console.log(e);
      }
    };

    init();
  }, []);

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

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      const nextPage = page + 1;

      const data = await fetchPortfolio(nextPage, 10, false);

      setPortfolios((prev) => [...prev, ...data]);
      setPage(nextPage);

      if (data.length < 10) setHasMore(false);
    } catch (e) {
      console.log(e);
    }

    setIsLoadingMore(false);
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
      console.log(err);
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

  return (
    <View style={styles.container}>
      {loading ? (
        <CustomLoading />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.rankBannerWrapper}>
            <Pressable
              style={({ pressed }) => [
                styles.pressableWrap,
                pressed && { transform: [{ scale: 0.97 }] },
              ]}
            >
              <LinearGradient
                colors={["#FF7A00", "#FF2D2D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.rankBanner}
              >
                <View>
                  <Text style={styles.bannerTitle}>🔥 Bảng xếp hạng</Text>
                  <Text style={styles.bannerSub}>
                    Khám phá TOP hồ sơ nổi bật
                  </Text>
                </View>

                <Text style={styles.bannerBtn}>Xem ngay</Text>
              </LinearGradient>
            </Pressable>
          </View>
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
              if (index >= portfolios.length - 2) {
                loadMore();
              }
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
                        onPress={() =>
                          console.log("save", portfolio.portfolioId)
                        }
                      >
                        <Image
                          source={require("../../../assets/myApp/save.png")}
                          style={styles.icon}
                        />
                      </Pressable>
                    )}
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
      )}
      <RatingModal
        key={selectedPortfolioId + "_" + ratingData.id + "_" + ratingData.score}
        visible={ratingVisible}
        ratingData={ratingData}
        setRatingData={setRatingData}
        loading={ratingLoading}
        onClose={() => setRatingVisible(false)}
        onSubmit={handleSubmitRating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  page: {
    width,
    flex: 1,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 18,
  },
  icon: {
    width: 27,
    height: 27,
  },
  iconRating: {
    width: 40,
    height: 40,
  },
  expandButton: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    backgroundColor: "rgba(243, 244, 246, 0.9)",
    width: "90%",
    height: 70,
    paddingTop: 10,
    alignItems: "center",
  },

  expandText: {
    color: "#6B7280",
    fontWeight: "600",
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
});
