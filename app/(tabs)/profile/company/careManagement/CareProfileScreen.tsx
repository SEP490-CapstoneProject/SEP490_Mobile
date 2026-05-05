import CustomLoading from "@/components/CustomLoading";
import FollowModal from "@/components/FollowModal";
import PortfolioRenderer from "@/components/portfolio/render/PortfolioRenderer";
import {
  fetchMyFollows,
  getFollowCategories,
  updateFollow,
} from "@/services/portfolio.api";
import { showError, showSuccess } from "@/utils/toast";

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
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [mode, setMode] = useState<"ALL" | "CATEGORY">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [followVisible, setFollowVisible] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<{
    id: number;
    categoryId: number;
    level: string;
  } | null>(null);

  const loadAll = async () => {
    try {
      setLoading(true);

      const [portData, cateData] = await Promise.all([
        fetchMyFollows(),
        getFollowCategories(),
      ]);

      setPortfolios(portData || []);
      setCategories(cateData || []);
      setSelectedCategory(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadByCategory = async (categoryId: number) => {
    try {
      setLoading(true);

      const data = await fetchMyFollows(categoryId);

      setPortfolios(data || []);
      setSelectedCategory(categoryId);
    } catch (err) {
      showError("Update error", err as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleFollow = async (data: { categoryId: number; level: string }) => {
    try {
      if (!selectedPortfolio) return;
      setPortfolios((prev) =>
        prev.map((p) =>
          p.portfolioId === selectedPortfolio.id
            ? {
                ...p,
                categoryId: data.categoryId,
                interestLevel: data.level.toLowerCase(),
              }
            : p,
        ),
      );

      await updateFollow(selectedPortfolio.id, data.categoryId, data.level);

      showSuccess("Update success", "");
    } catch (err) {
      showError("Update error", err as string);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => {
            setMode("ALL");
            loadAll();
          }}
          style={[styles.tabBtn, mode === "ALL" && styles.activeTab]}
        >
          <Text
            style={mode === "ALL" ? styles.activeText : styles.inactiveText}
          >
            Tất cả
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setMode("CATEGORY")}
          style={[styles.tabBtn, mode === "CATEGORY" && styles.activeTab]}
        >
          <Text
            style={
              mode === "CATEGORY" ? styles.activeText : styles.inactiveText
            }
          >
            Theo thư mục
          </Text>
        </Pressable>
      </View>

      {mode === "CATEGORY" && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginHorizontal: 14,
            marginBottom: 10,
            maxHeight: 30,
            minHeight: 30,
          }}
        >
          {categories.map((cate) => (
            <Pressable
              key={cate.id}
              onPress={() => loadByCategory(cate.id)}
              style={[
                styles.categoryItem,
                selectedCategory === cate.id && styles.activeCategory,
              ]}
            >
              <Text>{cate.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {loading ? (
        <CustomLoading />
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {portfolios.length === 0 && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Không có dữ liệu
            </Text>
          )}

          {portfolios.map((p) => (
            <View key={p.portfolioId} style={styles.card}>
              <PortfolioRenderer blocks={[p.preview]} />

              <View style={styles.priority}>
                <View
                  style={[
                    styles.dot,
                    p.interestLevel == "high"
                      ? { backgroundColor: "#DC2626" }
                      : p.interestLevel == "medium"
                        ? { backgroundColor: "#EAB308" }
                        : p.interestLevel == "low"
                          ? { backgroundColor: "#22C55E" }
                          : {},
                  ]}
                />

                {p.interestLevel === "high" && (
                  <Text style={{ color: "#DC2626" }}>Mức độ ưu tiên: Cao</Text>
                )}
                {p.interestLevel === "medium" && (
                  <Text style={{ color: "#EAB308" }}>
                    Mức độ ưu tiên: Trung bình
                  </Text>
                )}
                {p.interestLevel === "low" && (
                  <Text style={{ color: "#22C55E" }}>Mức độ ưu tiên: Thấp</Text>
                )}

                <Pressable
                  onPress={() => {
                    setSelectedPortfolio({
                      id: p.portfolioId,
                      categoryId: p.categoryId ?? null,
                      level: (p.interestLevel || "").toUpperCase(),
                    });

                    setFollowVisible(true);
                  }}
                >
                  <Image
                    source={require("../../../../../assets/myApp/pencil1.png")}
                    style={styles.pencil1}
                  />
                </Pressable>
              </View>

              {p.isUpdatedSinceFollow && (
                <View style={styles.isUpdated}>
                  <View style={styles.backgroundUpdate}>
                    <Text style={{ color: "#306EE8" }}>Mới cập nhật</Text>
                  </View>
                  <Text style={{ color: "#306EE8" }}>
                    Hồ sơ này mới được cập nhật
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}

      <FollowModal
        visible={followVisible}
        onClose={() => setFollowVisible(false)}
        onSubmit={handleFollow}
        defaultCategoryId={selectedPortfolio?.categoryId}
        defaultLevel={selectedPortfolio?.level}
      />
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
    padding: 5,
    borderRadius: 10,
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
    marginHorizontal: 20,
    marginVertical: 10,
    gap: 10,
  },

  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
  },

  activeTab: {
    backgroundColor: "#3B82F6",
  },

  activeText: {
    color: "#fff",
  },

  inactiveText: {
    color: "#6B7280",
  },

  categoryItem: {
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    alignSelf: "center",
    paddingVertical: 5,
  },

  activeCategory: {
    backgroundColor: "#DBEAFE",
    borderColor: "#2563EB",
  },
});
