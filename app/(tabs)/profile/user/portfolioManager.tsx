import PortfolioRenderer from "@/components/portfolio/render/portfolioRenderer";
import { getAuth } from "@/services/auth.api";
import { fetchMainPortfoliosManagerByUser } from "@/services/portfolio.api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    Modal,
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
  portfolio: {
    name: string;
    status: number;
  };
  blocks: PortfolioBlock;
};

export default function PortfolioManager() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [portfolios, setPortfolios] = useState<PortfolioMainBlockItem[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    getAuth().then(setUser);
  }, []);

  useEffect(() => {
    if (!user?.userId) return;
    fetchMainPortfoliosManagerByUser(user.userId).then(setPortfolios);
  }, [user]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../../assets/myApp/arrow.png")}
            style={styles.headerIcon}
          />
        </Pressable>
        <Text style={styles.title}>Quản lý hồ sơ</Text>
      </View>

      <ScrollView>
        {portfolios.map((p) => (
          <View key={p.portfolioId} style={styles.content}>
            <View style={{ marginBottom: 18 }} />
            <View style={styles.contentUp}>
              {p.portfolio.status === 1 && (
                <View style={styles.statusBackground}>
                  <Text style={styles.status}>Bản chính</Text>
                </View>
              )}

              <Pressable onPress={() => setOpenMenuId(p.portfolioId)}>
                <Image
                  source={require("../../../../assets/myApp/dots.png")}
                  style={{ width: 25, height: 25 }}
                />
              </Pressable>
            </View>

            <PortfolioRenderer blocks={[p.blocks]} />

            <View style={styles.contentDown}>
              <View style={styles.line} />
              <Text style={styles.name}>{p.portfolio.name}</Text>
            </View>

            {/* MENU MODAL  */}
            <Modal
              transparent
              visible={openMenuId === p.portfolioId}
              animationType="fade"
              onRequestClose={() => setOpenMenuId(null)}
            >
              <Pressable
                style={styles.modalBackdrop}
                onPress={() => setOpenMenuId(null)}
              />

              <View style={styles.modalMenuWrapper}>
                <View style={styles.menuBox}>
                  <Pressable
                    style={[
                      styles.menuItem,
                      styles.menuTop,
                      { backgroundColor: "#DCFCE7", justifyContent: "center" },
                    ]}
                  >
                    <Text style={{ color: "#1B8442" }}>
                      {p.portfolio.status
                        ? "Hủy bản chính"
                        : "Đặt làm bản chính"}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.menuItem, { backgroundColor: "#EDF2F9" }]}
                    onPress={() => {
                      setOpenMenuId(null);
                      router.push({
                        pathname: "/(tabs)/profile/user/portfolioView",
                        params: { portfolioId: String(p.portfolioId) },
                      });
                    }}
                  >
                    <Image
                      source={require("../../../../assets/myApp/view.png")}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text style={{ color: "#6B7280" }}>Xem chi tiết</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.menuItem, { backgroundColor: "#E1EEFF" }]}
                  >
                    <Image
                      source={require("../../../../assets/myApp/pencil1.png")}
                      style={{ width: 18, height: 18 }}
                    />
                    <Text style={{ color: "#2563EB" }}>Chỉnh sửa</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.menuItem, { backgroundColor: "#FAD1D2" }]}
                  >
                    <Image
                      source={require("../../../../assets/myApp/trash.png")}
                      style={{ width: 18, height: 18 }}
                    />
                    <Text style={{ color: "#EF4444" }}>Xóa</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.menuItem,
                      styles.menuBottom,
                      { backgroundColor: "#FFFFFF" },
                    ]}
                  >
                    <Image
                      source={require("../../../../assets/myApp/share_black.png")}
                      style={{ width: 18, height: 18 }}
                    />
                    <Text>Chia sẻ</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        ))}
      </ScrollView>
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

  status: { color: "#1B8442", fontSize: 12, fontWeight: "bold" },

  contentDown: { marginTop: 10 },
  line: { height: 1, backgroundColor: "#E2E8F0", marginHorizontal: 15 },
  name: { fontSize: 16, fontWeight: "bold", margin: 10 },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.01)",
  },

  modalMenuWrapper: {
    position: "absolute",
    top: 160,
    right: 20,
  },

  menuBox: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 8,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  menuTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  menuBottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 0,
  },
});
