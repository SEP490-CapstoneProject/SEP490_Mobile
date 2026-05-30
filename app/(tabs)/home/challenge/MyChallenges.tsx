import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import CustomLoading from "@/components/CustomLoading";
import { fetchMyChallengeSubmissions } from "@/services/challenge.api";
import { showError } from "@/utils/toast";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function MyChallengeHistory() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [skip, setSkip] = useState(0);
  const take = 100;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetchMyChallengeSubmissions(0, take);

      setData(res.items || res);
    } catch (err) {
      showError(
        "Lỗi tải dữ liệu",
        "Không thể tải lịch sử nộp bài của bạn. Vui lòng thử lại sau.",
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const newSkip = skip + take;

      const res = await fetchMyChallengeSubmissions(newSkip, take);

      setData((prev) => [...prev, ...(res.items || res)]);

      setSkip(newSkip);
    } catch (err) {
      console.log(err);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <CustomLoading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingHorizontal: 16,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text style={styles.title}>Lịch sử nộp bài</Text>
      </View>
      <Text style={styles.subtitle}>
        Xem lại kết quả và nhận xét từ giám khảo cho các thử thách bạn đã tham
        gia.
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item.challengeId?.toString() || index.toString()
        }
        renderItem={({ item }) => {
          const success =
            item.latestEvaluationStatus === "Completed" ||
            item.latestEvaluationStatus === "pending";

          return (
            <View style={styles.card}>
              <View style={styles.topRow}>
                <Text style={styles.challengeTitle}>{item.challengeTitle}</Text>
              </View>

              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Đã hoàn thành</Text>
                </View>

                <View
                  style={[
                    styles.scoreTag,
                    {
                      backgroundColor: "#FEF9C3",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: "#854D0E",
                      fontWeight: "700",
                      fontSize: 12,
                    }}
                  >
                    {item.latestEvaluationScore != null
                      ? `Điểm: ${item.latestEvaluationScore}`
                      : "Điểm: 0"}
                  </Text>
                </View>
              </View>

              <Text numberOfLines={3} style={styles.description}>
                {item.challengeDescription || "Không có mô tả"}
              </Text>

              <View style={styles.resultBox}>
                <Text style={styles.resultTitle}>
                  Chi tiết kết quả nộp bài:
                </Text>

                <View style={styles.row}>
                  <Text style={styles.label}>Nộp bài lần cuối:</Text>

                  <Text style={styles.value}>
                    {formatDateTime(item.latestSubmittedAt)}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Trạng thái nộp:</Text>

                  <Text
                    style={{
                      color: success ? "#16A34A" : "#DC2626",
                      fontWeight: "700",
                      fontSize: 13,
                    }}
                  >
                    {success ? "Thành công" : "Không đạt"}
                  </Text>
                </View>

                {item.latestFeedback && (
                  <>
                    <Text style={styles.feedbackTitle}>
                      Nhận xét từ giám khảo:
                    </Text>

                    <View style={styles.feedbackBox}>
                      <Text style={styles.feedbackText}>
                        {item.latestFeedback}
                      </Text>
                    </View>
                  </>
                )}
              </View>

              <View style={styles.bottomInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={15} color="#94A3B8" />

                  <Text style={styles.infoText}>Hạn chót:</Text>

                  <Text style={styles.deadline}>
                    {formatDateTime(item.challengeDeadline)}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons
                    name="document-text-outline"
                    size={15}
                    color="#94A3B8"
                  />

                  <Text style={styles.infoText}>Số lần nộp:</Text>

                  <Text style={styles.submitCount}>
                    {item.attemptCount || 1}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: 40,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 6,
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  statRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6D28D9",
  },

  statLabel: {
    color: "#64748B",
    marginTop: 4,
  },

  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  filterBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
  },

  filterBtnActive: {
    backgroundColor: "#7C3AED",
  },

  filterText: {
    color: "#64748B",
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 22,

    padding: 16,

    marginBottom: 16,

    borderWidth: 1,
    borderColor: "#DDD6FE",

    shadowColor: "#7C3AED",
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  challengeTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    marginRight: 8,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 8,

    marginTop: 12,
  },

  tag: {
    backgroundColor: "#DCFCE7",

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 20,
  },

  tagText: {
    color: "#16A34A",
    fontWeight: "600",
    fontSize: 12,
  },

  scoreTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  description: {
    marginTop: 15,

    color: "#475569",

    lineHeight: 22,
  },

  resultBox: {
    marginTop: 15,

    backgroundColor: "#F8FAFC",

    borderRadius: 16,

    padding: 14,

    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  resultTitle: {
    fontWeight: "700",

    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 8,
  },

  label: {
    color: "#64748B",
    fontSize: 12,
  },

  value: {
    color: "#0F172A",
    fontWeight: "600",
    fontSize: 12,
  },

  feedbackTitle: {
    marginTop: 12,

    color: "#64748B",

    fontWeight: "600",
  },

  feedbackBox: {
    marginTop: 8,

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    padding: 12,

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  feedbackText: {
    color: "#475569",

    fontStyle: "italic",

    lineHeight: 22,

    fontSize: 12,
  },

  bottomInfo: {
    marginTop: 16,

    gap: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    marginLeft: 6,

    color: "#94A3B8",

    fontSize: 12,
  },

  deadline: {
    marginLeft: "auto",

    color: "#000",
    fontSize: 13,
    fontWeight: "700",
  },

  submitCount: {
    marginLeft: "auto",

    fontWeight: "700",

    color: "#0F172A",
  },
});
