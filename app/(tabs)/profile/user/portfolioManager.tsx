import PortfolioRenderer from "@/components/portfolio/render/portfolioRenderer";
import { getAuth } from "@/services/auth.api";
import { fetchMainPortfoliosManagerByUser } from "@/services/portfolio.api";
import { shareContent } from "@/services/share";
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

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioMainBlockItem | null>(null);

  useEffect(() => {
    getAuth().then(setUser);
  }, []);

  useEffect(() => {
    if (!user?.userId) return;
    fetchMainPortfoliosManagerByUser(user.userId).then(setPortfolios);
  }, [user]);

  const openMenu = (event: any, portfolio: PortfolioMainBlockItem) => {
    event.target.measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        setMenuPosition({
          x: x - 152,
          y: y + height,
        });
        setSelectedPortfolio(portfolio);
        setMenuVisible(true);
      },
    );
  };

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

              <Pressable onPress={(e) => openMenu(e, p)}>
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
          </View>
        ))}
      </ScrollView>

      {/* CUSTOM POPOVER */}
      {menuVisible && selectedPortfolio && (
        <>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setMenuVisible(false)}
          />

          <View
            style={[
              styles.menuBox,
              {
                top: menuPosition.y,
                left: menuPosition.x,
              },
            ]}
          >
            <Pressable
              style={[
                styles.menuItem,
                {
                  backgroundColor: "#DCFCE7",
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,
                },
              ]}
            >
              <Text style={{ color: "#1B8442", fontWeight: "600" }}>
                {selectedPortfolio.portfolio.status
                  ? "Hủy bản chính"
                  : "Đặt làm bản chính"}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.menuItem, { backgroundColor: "#F0F9FF" }]}
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/profile/user/portfolioView",
                  params: {
                    portfolioId: String(selectedPortfolio.portfolioId),
                  },
                });
                setMenuVisible(false);
              }}
            >
              <Image
                source={require("../../../../assets/myApp/view.png")}
                style={{ width: 18, height: 18 }}
              />
              <Text>Xem chi tiết</Text>
            </Pressable>

            <Pressable
              style={[styles.menuItem, { backgroundColor: "#E1EEFF" }]}
            >
              <Image
                source={require("../../../../assets/myApp/pencil1.png")}
                style={{ width: 18, height: 18 }}
              />
              <Text>Chỉnh sửa</Text>
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
                { borderBottomLeftRadius: 14, borderBottomRightRadius: 14 },
              ]}
              onPress={() =>
                shareContent(
                  `https://skillsnap.io/portfolio/${selectedPortfolio.portfolioId}`,
                )
              }
            >
              <Image
                source={require("../../../../assets/myApp/share_black.png")}
                style={{ width: 18, height: 18 }}
              />
              <Text>Chia sẻ</Text>
            </Pressable>
          </View>
        </>
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

  status: {
    color: "#1B8442",
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

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
  },
});
