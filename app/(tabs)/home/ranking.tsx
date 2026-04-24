import { fetchPortfolio } from "@/services/portfolio.api";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function RankingScreen() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewers, setShowReviewers] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchPortfolio(1, 50, false, 0);

        setData(res);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const extract = (p: any) => {
    const block = p?.blocks?.[0];

    return {
      id: p?.portfolioId,
      avatar: block?.data?.avatar,
      name: block?.data?.name || p?.portfolioName,
      field: block?.data?.studyField,
      reviewers: p?.reviewers || [],
      rank: p?.ranking?.rankPosition,
    };
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const top1 = data[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Bảng xếp hạng</Text>
      <ScrollView>
        {top1 && (
          <View style={styles.top1Wrapper}>
            <View style={styles.badgeWrapper}>
              <LinearGradient
                colors={["#FF7A00", "#FF2D2D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.badge}
              >
                <Text style={styles.badgeText}>🔥 NỔI BẬT </Text>
                <Text style={styles.badgeRank}>#1</Text>
              </LinearGradient>
            </View>

            <View style={styles.cardTop}>
              {/* Avatar */}
              <Image
                source={{ uri: top1.blocks?.[0]?.data?.avatar }}
                style={styles.avatar}
              />

              {/* Name */}
              <Text style={styles.name}>{top1.blocks?.[0]?.data?.name}</Text>

              {/* Role */}
              <Text style={styles.field}>
                {top1.blocks?.[0]?.data?.studyField}
              </Text>

              {/* <View style={styles.rating}>
              <Text style={styles.stars}>⭐ ⭐ ⭐ ⭐ ☆</Text>
              <Text style={styles.score}>9.0</Text>
            </View> */}

              <Pressable
                style={styles.reviewers}
                onPress={() => setShowReviewers(true)}
              >
                {top1.reviewers?.slice(0, 4).map((r: any, index: number) => (
                  <Image
                    key={r.userId}
                    source={{ uri: r.avatar }}
                    style={[
                      styles.reviewerAvatar,
                      { marginLeft: index === 0 ? 0 : -10 },
                    ]}
                  />
                ))}

                {top1.reviewers?.length > 4 && (
                  <View style={[styles.moreCircle, { marginLeft: -10 }]}>
                    <Text style={styles.moreText}>
                      +{top1.reviewers.length - 4}
                    </Text>
                  </View>
                )}
              </Pressable>

              {/* Button */}
              <Pressable
                style={styles.button}
                onPress={() => {
                  router.push({
                    pathname: `/(tabs)/profile/viewPortfolio`,
                    params: { portId: top1.portfolioId },
                  });
                }}
              >
                <Text style={styles.buttonText}>Xem Portfolio</Text>
              </Pressable>
            </View>
          </View>
        )}

        <View style={styles.grid}>
          {data.slice(1, 5).map((p, i) => {
            const item = extract(p);

            return (
              <Pressable
                key={item.id}
                style={styles.card}
                onPress={() => {
                  router.push({
                    pathname: `/(tabs)/profile/viewPortfolio`,
                    params: { portId: item.id },
                  });
                }}
              >
                <Image
                  source={{
                    uri: item.avatar,
                  }}
                  style={styles.avatar}
                />
                <View style={styles.rank}>
                  <LinearGradient
                    colors={["#FF7A00", "#FF2D2D"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.rankBadge}
                  >
                    <Text style={styles.rankText}>#{i + 2}</Text>
                  </LinearGradient>
                </View>

                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.field}>{item.field}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.list}>
          {data.slice(5, 10).map((p, i) => {
            const item = extract(p);

            return (
              <Pressable
                key={item.id}
                style={styles.row}
                onPress={() => {
                  router.push({
                    pathname: `/(tabs)/profile/viewPortfolio`,
                    params: { portId: item.id },
                  });
                }}
              >
                <Image
                  source={{
                    uri: item.avatar,
                  }}
                  style={styles.rowAvatar}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.field}>{item.field}</Text>
                </View>

                <Text style={styles.rankSmall}>#{i + 6}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <Modal visible={showReviewers} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.modalTitle}>Người đã chấm điểm</Text>
              <Pressable onPress={() => setShowReviewers(false)}>
                <Image
                  source={require("../../../assets/myApp/close1.png")}
                  style={styles.closeButton}
                />
              </Pressable>
            </View>

            <FlatList
              data={top1.reviewers}
              keyExtractor={(item) => item.userId.toString()}
              renderItem={({ item }) => (
                <View style={styles.reviewerItem}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={styles.reviewerAvatarLarge}
                  />
                  <Text style={styles.reviewerName}>{item.name}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
    marginTop: 30,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  top1Wrapper: {
    alignItems: "center",
    marginTop: 40,
  },

  badgeWrapper: {
    position: "absolute",
    top: -20,
    zIndex: 2,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cardTop: {
    width: "60%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 8,
  },

  badgeRank: {
    color: "#fff",
    fontWeight: "700",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginTop: 20,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 16,
  },

  field: {
    fontSize: 12,
    color: "#FF7A00",
    fontWeight: "600",
    marginTop: 4,
    letterSpacing: 1,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  stars: {
    fontSize: 16,
    color: "#FACC15",
  },

  score: {
    marginLeft: 6,
    fontWeight: "600",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 30,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  btn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 12,
  },

  btnText: {
    color: "#fff",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
  },

  rank: {
    position: "absolute",
    top: 8,
    right: 8,
  },

  rankBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  rankText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  list: {
    padding: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 2,
  },

  rowAvatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },

  rankSmall: {
    fontWeight: "bold",
  },

  reviewers: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  moreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  moreText: {
    fontSize: 12,
    fontWeight: "600",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  reviewerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  reviewerAvatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 35,
    marginRight: 10,
    borderColor: "#E2E8F0",
    borderWidth: 1,
  },

  reviewerName: {
    fontSize: 17,
    fontWeight: "500",
  },
  closeButton: {
    width: 15,
    height: 15,
    tintColor: "#111827",
  },
});
