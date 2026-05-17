import PortfolioRenderer from "@/components/portfolio/render/PortfolioRenderer";

import {
  fetchPortfolioMe,
  toggleMainPortfolio,
  togglePublicPortfolio,
} from "@/services/portfolio.api";
import { shareContent } from "@/services/share";
import { getAuth } from "@/services/storage";
import { showError } from "@/utils/toast";
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

type PortfolioBlock = {
  id: number;
  type: string;
  variant: string;
  order: number;
  data: any;
};

type PortfolioMainBlockItem = {
  portfolioId: number;
  userId: number;
  isMain: boolean;
  isPublic: boolean;
  portfolio: {
    name: string;
    status: number;
  };
  blocks: PortfolioBlock;
};

export default function PortfolioManager() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [portfolios, setPortfolios] = useState<any[]>([]);

  const [menuVisible, setMenuVisible] = useState(false);

  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioMainBlockItem | null>(null);

  useEffect(() => {
    getAuth().then(setUser);
  }, []);

  useEffect(() => {
    const loadPortfolio = async () => {
      const data = await fetchPortfolioMe();
      setPortfolios(data);
    };

    loadPortfolio();
  }, []);

  const openMenu = (portfolio: PortfolioMainBlockItem) => {
    setSelectedPortfolio(portfolio);
    setMenuVisible(true);
  };

  const handleToggleMain = async () => {
    if (!selectedPortfolio) return;

    try {
      await toggleMainPortfolio(selectedPortfolio.portfolioId);

      const newValue = !selectedPortfolio.isMain;

      setPortfolios((prev) =>
        prev.map((p) => {
          if (p.portfolioId === selectedPortfolio.portfolioId) {
            return {
              ...p,
              isMain: newValue,
            };
          }
          if (newValue) {
            return {
              ...p,
              isMain: false,
            };
          }

          return p;
        }),
      );

      setSelectedPortfolio((prev) =>
        prev
          ? {
              ...prev,
              isMain: newValue,
            }
          : null,
      );
    } catch (err) {
      showError("Lỗi", err as string);
    }
  };

  const handleTogglePublic = async () => {
    try {
      if (!selectedPortfolio) return;

      await togglePublicPortfolio(selectedPortfolio.portfolioId);

      setPortfolios((prev) =>
        prev.map((p) =>
          p.portfolioId === selectedPortfolio.portfolioId
            ? {
                ...p,
                isPublic: !p.isPublic,
              }
            : p,
        ),
      );

      setSelectedPortfolio((prev) =>
        prev
          ? {
              ...prev,
              isPublic: !prev.isPublic,
            }
          : null,
      );
    } catch (err) {
      showError("lỗi", "");
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.push("/(tabs)/profile/user")}>
          <Image
            source={require("../../../../assets/myApp/arrow.png")}
            style={styles.headerIcon}
          />
        </Pressable>
        <Text style={styles.title}>Quản lý hồ sơ</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {portfolios.map((p) => (
          <View key={p.portfolioId} style={styles.content}>
            <View style={{ marginBottom: 18 }} />

            <View style={styles.contentUp}>
              {p.isMain ? (
                <View style={styles.statusBackground}>
                  <Text style={styles.status}>Bản chính</Text>
                </View>
              ) : (
                <View style={styles.statusBackgroundFalse}>
                  <Text style={styles.statusFalse}>Bản phụ</Text>
                </View>
              )}

              <Pressable onPress={() => openMenu(p)}>
                <Image
                  source={require("../../../../assets/myApp/dots.png")}
                  style={{ width: 25, height: 25 }}
                />
              </Pressable>
            </View>

            <PortfolioRenderer blocks={[p.blocks[0]]} />

            <View style={styles.contentDown}>
              <View style={styles.line} />
              <Text style={styles.name}>{p.portfolioName}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* CUSTOM POPOVER */}
      {menuVisible && selectedPortfolio && (
        <View style={styles.overlay}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setMenuVisible(false)}
          />

          <View style={styles.bottomSheet}>
            {/* thanh kéo */}
            <View style={styles.dragBar} />

            <Pressable style={styles.menuItem} onPress={handleToggleMain}>
              <Text
                style={{
                  color: selectedPortfolio.isMain ? "#1B8442" : "#000",
                  fontWeight: "600",
                }}
              >
                {selectedPortfolio.isMain
                  ? "Hủy bản chính"
                  : "Đặt làm bản chính"}
              </Text>
            </Pressable>

            <Pressable style={styles.menuItem} onPress={handleTogglePublic}>
              <Text
                style={{
                  color: selectedPortfolio.isPublic ? "#1B8442" : "#000",
                  fontWeight: "600",
                }}
              >
                {selectedPortfolio.isPublic
                  ? "Đang công khai"
                  : "Đăng công khai"}
              </Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => {
                router.push({
                  pathname: `/(tabs)/profile/viewPortfolio`,
                  params: {
                    portId: selectedPortfolio.portfolioId,
                  },
                });
                setMenuVisible(false);
              }}
            >
              <Image
                source={require("../../../../assets/myApp/view.png")}
                style={styles.menuIcon}
              />

              <Text>Xem chi tiết</Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <Image
                source={require("../../../../assets/myApp/pencil1.png")}
                style={styles.menuIcon}
              />

              <Text>Chỉnh sửa</Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <Image
                source={require("../../../../assets/myApp/trash.png")}
                style={styles.menuIcon}
              />

              <Text style={{ color: "#EF4444" }}>Xóa</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => {
                shareContent(
                  `https://skillsnap.io/portfolio/${selectedPortfolio.portfolioId}`,
                );

                setMenuVisible(false);
              }}
            >
              <Image
                source={require("../../../../assets/myApp/share_black.png")}
                style={styles.menuIcon}
              />

              <Text>Chia sẻ</Text>
            </Pressable>

            <Pressable
              style={[styles.menuItem, { justifyContent: "center" }]}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={{ fontWeight: "600" }}>Hủy</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 15,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  headerIcon: { width: 23, height: 23 },
  title: { fontSize: 20, fontWeight: "bold" },

  content: {
    margin: 15,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    position: "relative",
  },

  contentUp: {
    position: "absolute",
    right: 10,
    top: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  statusBackground: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusBackgroundFalse: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  status: {
    color: "#1B8442",
    fontSize: 12,
    fontWeight: "bold",
  },

  statusFalse: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "bold",
  },

  contentDown: { marginTop: 10 },

  line: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },

  menuBox: {
    position: "absolute",
    width: 190,
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 25,
  },

  dragBar: {
    width: 45,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#D1D5DB",
    alignSelf: "center",
    marginBottom: 15,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  menuIcon: {
    width: 20,
    height: 20,
  },
});
