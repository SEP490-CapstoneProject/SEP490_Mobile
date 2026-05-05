import { fetchPortfolioById } from "@/services/portfolio.api";
import { showError } from "@/utils/toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import CustomLoading from "../../../components/CustomLoading";
import PortfolioRenderer from "../../../components/portfolio/render/PortfolioRenderer";

export default function ViewPortfolio() {
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<any>();
  const { portId } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchPortfolioById(Number(portId));
        setPortfolio(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        showError("Lỗi", err as string);
      }
    };

    load();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.iconContainer}>
        <View style={styles.iconLeft}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backgroundIcon}
          >
            <Image
              source={require("../../../assets/myApp/arrow.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>
        <View style={styles.iconRight}>
          <View style={styles.backgroundIcon}>
            <Image
              source={require("../../../assets/myApp/share_black.png")}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
      {loading ? (
        <CustomLoading />
      ) : (
        <ScrollView
          style={{ marginTop: 30, marginBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {portfolio && (
            <PortfolioRenderer
              blocks={portfolio.blocks}
              rank={Number(portfolio.ranking?.rankPosition)}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 10,
    top: 30,
  },
  backgroundIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconRight: {
    right: 10,
    top: 10,
    flexDirection: "row",
    gap: 25,
  },
  iconLeft: {
    left: 10,
    top: 10,
  },
});
