import PortfolioRenderer from "@/components/portfolio/render/portfolioRenderer";
import { fetchPortfolio } from "@/services/home.api";
import { shareContent } from "@/services/share";
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

  useEffect(() => {
    const init = async () => {
      try {
        const data = await fetchPortfolio(1, 10, false);
        setPortfolios(data);
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
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Khám phá</Text>
        <Pressable onPress={() => console.log("Search pressed")}>
          <Image
            source={require("../../../assets/myApp/search1.png")}
            style={styles.searchIcon}
          />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
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
          scrollEventThrottle={16}
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
                <PortfolioRenderer blocks={portfolio.blocks} />
              </ScrollView>

              <View style={[styles.actionBar, styles.expandButton]}>
                <Pressable
                  onPress={() => console.log("connect", portfolio.portfolioId)}
                >
                  <Image
                    source={require("../../../assets/myApp/rating.png")}
                    style={styles.iconRating}
                  />
                </Pressable>
                <Pressable
                  onPress={() => console.log("save", portfolio.portfolioId)}
                >
                  <Image
                    source={require("../../../assets/myApp/save.png")}
                    style={styles.icon}
                  />
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
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1.5,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  page: {
    width,
    flex: 1,
  },
  actionBar: {
    position: "absolute",
    bottom: 5,
    left: 20,
    right: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
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
});
