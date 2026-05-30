// app/subscription/index.tsx

import { fetchPaymentHistory } from "@/services/subscription.api";

import { Ionicons } from "@expo/vector-icons";

import { useEffect, useState } from "react";

import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionScreen() {
  const [entitlements, setEntitlements] = useState<any>(null);
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);

  const [loadingSub, setLoadingSub] = useState(true);

  const [loadingHistory, setLoadingHistory] = useState(true);

  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5;

  useEffect(() => {
    loadHistory();
  }, [page]);

  const loadHistory = async () => {
    try {
      setLoadingHistory(true);

      const data = await fetchPaymentHistory(page, PAGE_SIZE);

      setTransactions(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "Succeeded":
        return {
          text: "Thành công",
          color: "#16A34A",
          bg: "#DCFCE7",
        };

      case "Expired":
        return {
          text: "Hết hạn",
          color: "#D97706",
          bg: "#FEF3C7",
        };

      case "Cancelled":
        return {
          text: "Đã hủy",
          color: "#DC2626",
          bg: "#FEE2E2",
        };

      default:
        return {
          text: status,
          color: "#374151",
          bg: "#F3F4F6",
        };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable onPress={() => router.back()}>
              <Image
                source={require("../../../assets/myApp/arrow.png")}
                style={styles.headerIcon}
              />
            </Pressable>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Lịch sử giao dịch</Text>
            </View>
          </View>
        </View>

        {loadingHistory ? (
          <ActivityIndicator size="large" color="#2563EB" />
        ) : (
          <View>
            <FlatList
              data={transactions}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const status = renderStatus(item.status);

                return (
                  <View style={styles.historyCard}>
                    <View style={styles.historyTop}>
                      <View>
                        <Text style={styles.orderCode}>#{item.orderCode}</Text>

                        <Text style={styles.historyDate}>
                          {new Date(item.createdAt).toLocaleString("vi-VN")}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.statusBox,
                          {
                            backgroundColor: status.bg,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            {
                              color: status.color,
                            },
                          ]}
                        >
                          {status.text}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.amount}>
                      {(item.amount * 1000).toLocaleString("vi-VN")}{" "}
                      {item.currency}
                    </Text>
                  </View>
                );
              }}
            />
            {transactions.length === 0 && !loadingHistory ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>Chưa có giao dịch nào</Text>
                <Text style={styles.emptyDesc}>
                  Bạn chưa thực hiện giao dịch nào. Hãy mua gói dịch vụ để có
                  thể sử dụng các tính năng của ứng dụng.
                </Text>
              </View>
            ) : (
              <View style={styles.pagination}>
                <Pressable
                  style={styles.pageBtn}
                  disabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  <Ionicons name="chevron-back" size={18} color="#111827" />
                </Pressable>

                <Text style={styles.pageText}>Trang {page}</Text>

                <Pressable
                  style={styles.pageBtn}
                  onPress={() => setPage((p) => p + 1)}
                >
                  <Ionicons name="chevron-forward" size={18} color="#111827" />
                </Pressable>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  subTitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },

  planCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 20,
    backgroundColor: "#2563EB",
  },

  planTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  planName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },

  expireText: {
    marginTop: 10,
    color: "#DBEAFE",
    fontSize: 13,
  },

  featureList: {
    marginTop: 20,
    gap: 12,
  },

  featureItem: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  featureLabel: {
    color: "#fff",
    fontWeight: "600",
  },

  featureValue: {
    color: "#fff",
    fontWeight: "800",
  },

  emptyBox: {
    margin: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  emptyDesc: {
    marginTop: 6,
    color: "#6B7280",
  },

  historyHeader: {
    marginHorizontal: 16,
    marginBottom: 12,
  },

  historyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  historyCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },

  historyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderCode: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  historyDate: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },

  amount: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "800",
    color: "#2563EB",
  },

  statusBox: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  pagination: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  pageBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  pageText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  headerLeft: {
    flexDirection: "row",
    gap: 15,
  },
  headerIcon: {
    width: 23,
    height: 23,
  },
});
