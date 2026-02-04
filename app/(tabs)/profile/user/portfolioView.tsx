import PortfolioRenderer from "@/components/portfolio/render/portfolioRenderer";
import { fetchPortfolioById } from "@/services/portfolio.api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PortfolioView() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<any>(null);
  const { portfolioId } = useLocalSearchParams<{ portfolioId: string }>();

  useEffect(() => {
    fetchPortfolioById(Number(portfolioId)).then(setPortfolio);
  }, []);

  if (!portfolio) return null;

  return (
    <View style={styles.container}>
      {/** header */}
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../../../../assets/myApp/arrow.png")}
              style={styles.headerIcon}
            />
          </Pressable>
          <Text style={styles.title}>Chi tiết hồ sơ</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PortfolioRenderer blocks={portfolio.blocks} />
      </ScrollView>
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
    justifyContent: "space-between",
    paddingHorizontal: 13,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1.2,
    paddingBottom: 15,
    marginTop: 30,
  },
  headerIcon: {
    width: 23,
    height: 23,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
