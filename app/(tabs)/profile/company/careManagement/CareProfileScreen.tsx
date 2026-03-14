import PortfolioRenderer from "@/components/portfolio/render/portfolioRenderer";
import {
  fetchFollowedPortfolios,
  FollowPortfolio,
} from "@/services/company/careManagement.api";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CareProfileScreen() {
  const [portfolios, setPortfolios] = useState<FollowPortfolio[]>([]);
  const [fillter, setFillter] = useState("ALL");

  useEffect(() => {
    fetchFollowedPortfolios().then(setPortfolios);
  }, []);

  const filteredPortfolios =
    fillter === "ALL"
      ? portfolios
      : portfolios.filter((p) => p.priority === fillter);

  return (
    <View style={{ marginBottom: 240 }}>
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => setFillter("ALL")}
          style={[
            fillter === "ALL"
              ? {
                  backgroundColor: "#3B82F6",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }
              : {
                  backgroundColor: "#EFF6FF",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                },
            ,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              fillter === "ALL" ? { color: "#FFFFFF" } : { color: "#6B7280" },
            ]}
          >
            Tất cả hồ sơ
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setFillter("HIGH")}
          style={[
            fillter === "HIGH"
              ? {
                  backgroundColor: "#3B82F6",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }
              : {
                  backgroundColor: "#EFF6FF",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                },
            ,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              fillter === "HIGH" ? { color: "#FFFFFF" } : { color: "#6B7280" },
            ]}
          >
            Cao
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setFillter("MEDIUM")}
          style={[
            fillter === "MEDIUM"
              ? {
                  backgroundColor: "#3B82F6",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }
              : {
                  backgroundColor: "#EFF6FF",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              fillter === "MEDIUM"
                ? { color: "#FFFFFF" }
                : { color: "#6B7280" },
            ]}
          >
            Trung bình
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setFillter("LOW")}
          style={[
            fillter === "LOW"
              ? {
                  backgroundColor: "#3B82F6",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }
              : {
                  backgroundColor: "#EFF6FF",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              fillter === "LOW" ? { color: "#FFFFFF" } : { color: "#6B7280" },
            ]}
          >
            Thấp
          </Text>
        </Pressable>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {filteredPortfolios.map((p, index) => (
          <View
            key={index}
            style={[
              styles.card,
              p.priority == "HIGH"
                ? { borderColor: "#DC2626" }
                : p.priority == "MEDIUM"
                  ? { borderColor: "#EAB308" }
                  : p.priority == "LOW"
                    ? { borderColor: "#22C55E" }
                    : {},
            ]}
          >
            <PortfolioRenderer blocks={[p.blocks]} />
            <View style={styles.priority}>
              <View
                style={[
                  styles.dot,
                  p.priority == "HIGH"
                    ? { backgroundColor: "#DC2626" }
                    : p.priority == "MEDIUM"
                      ? { backgroundColor: "#EAB308" }
                      : p.priority == "LOW"
                        ? { backgroundColor: "#22C55E" }
                        : {},
                ]}
              />
              {p.priority === "HIGH" && (
                <Text style={{ color: "#DC2626" }}>Mức độ ưu tiên: Cao</Text>
              )}
              {p.priority === "LOW" && (
                <Text style={{ color: "#22C55E" }}>Mức độ ưu tiên: Thấp</Text>
              )}
              {p.priority === "MEDIUM" && (
                <Text style={{ color: "#EAB308" }}>
                  Mức độ ưu tiên: Trung bình
                </Text>
              )}
              <Pressable>
                <Image
                  source={require("../../../../../assets/myApp/pencil1.png")}
                  style={styles.pencil1}
                />
              </Pressable>
            </View>

            {p.isUpdated == true && (
              <View style={styles.isUpdated}>
                <View style={styles.backgroundUpdate}>
                  <Text style={{ color: "#306EE8" }}>Mới cập nhật</Text>
                </View>
                <Text style={{ color: "#306EE8", fontSize: 14.5 }}>
                  Hồ sơ này mới được cập nhật
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
  },

  card: {
    borderWidth: 1.3,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  priority: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginLeft: 20,
    marginVertical: 10,
  },
  backgroundUpdate: {
    backgroundColor: "#EFF6FF",
    width: 110,
    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  isUpdated: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginLeft: 20,
    marginVertical: 10,
  },
  pencil1: {
    width: 13,
    height: 13,
    tintColor: "#6B7280",
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginVertical: 7,
    gap: 14,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14.5,
  },
});
