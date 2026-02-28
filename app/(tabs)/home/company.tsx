import PortfolioRenderer from "@/components/portfolio/render/portfolioRenderer";
import { fetchPortfolio } from "@/services/home.api";
import { PortfolioResponse } from "@/services/portfolio.api";
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
  const [portfolios, setPortfolios] = useState<PortfolioResponse[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const verticalRefs = useRef<(ScrollView | null)[]>([]);

  useEffect(() => {
    fetchPortfolio().then(setPortfolios);
  }, []);

  const handleScroll = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const diff = Math.abs(offsetX - activeIndex * width);

    if (diff > width * 0.5 && isExpanded) {
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
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
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
                scrollEnabled={isExpanded}
              >
                <PortfolioRenderer blocks={portfolio.blocks} />
              </ScrollView>
              {!isExpanded && (
                <Pressable
                  style={styles.expandButton}
                  onPress={() => setIsExpanded(true)}
                >
                  <Text style={styles.expandText}>Xem thêm</Text>
                </Pressable>
              )}
              <View style={styles.actionBar}>
                <Pressable
                  onPress={() =>
                    console.log(
                      "DisLike pressed for portfolio",
                      portfolio.portfolioId,
                    )
                  }
                >
                  <Image
                    source={require("../../../assets/myApp/close1.png")}
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable
                  onPress={() => console.log("connect", portfolio.portfolioId)}
                >
                  <Image
                    source={require("../../../assets/myApp/1.png")}
                    style={styles.icon}
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
                  onPress={() => console.log("share", portfolio.portfolioId)}
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
    height: 70,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,1)",
    borderColor: "#E2E8F0",
    borderWidth: 1,
    alignItems: "center",
    borderTopColor: "#E2E8F0",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    width: 25,
    height: 25,
  },
  expandButton: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    backgroundColor: "rgba(243, 244, 246, 0.9)",
    width: "100%",
    height: 120,
    paddingTop: 10,
    alignItems: "center",
  },

  expandText: {
    color: "#6B7280",
    fontWeight: "600",
  },
});
