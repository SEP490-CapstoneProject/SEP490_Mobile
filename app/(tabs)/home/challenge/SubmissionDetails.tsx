import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Star,
  XCircle,
} from "lucide-react-native";

import { useCallback, useEffect, useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";

import { getSubmissionDetail } from "@/services/challenge.api";

import { SubmissionDetailResponse } from "@/utils/challenge";

import CustomLoading from "@/components/CustomLoading";
import { showError } from "@/utils/toast";

export default function SubmissionDetail() {
  const router = useRouter();

  const { submissionId } = useLocalSearchParams<{
    submissionId: string;
  }>();

  const [submission, setSubmission] = useState<SubmissionDetailResponse | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);

  const loadSubmissionDetail = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!submissionId) {
        throw new Error("Invalid submission ID");
      }

      const data = await getSubmissionDetail(submissionId);

      setSubmission(data);
    } catch (err: any) {
      showError("Lỗi", err?.message || "Có lỗi khi tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  }, [submissionId]);

  useEffect(() => {
    if (submissionId) {
      loadSubmissionDetail();
    }
  }, [submissionId, loadSubmissionDetail]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CustomLoading />
      </View>
    );
  }

  if (!submission) {
    return (
      <View style={styles.emptyContainer}>
        <AlertCircle size={48} color="#DC2626" />

        <Text style={styles.emptyTitle}>Không tìm thấy bài nộp</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "Graded":
        return {
          label: "Đã chấm điểm",
          bg: "#DCFCE7",
          color: "#166534",
          icon: <CheckCircle2 size={16} color="#166534" />,
        };

      case "Pending":
        return {
          label: "Đang chờ",
          bg: "#FEF3C7",
          color: "#92400E",
          icon: <Loader2 size={16} color="#92400E" />,
        };

      case "Failed":
        return {
          label: "Thất bại",
          bg: "#FEE2E2",
          color: "#991B1B",
          icon: <XCircle size={16} color="#991B1B" />,
        };

      default:
        return {
          label: status,
          bg: "#E2E8F0",
          color: "#1E293B",
          icon: null,
        };
    }
  };

  const statusDisplay = getStatusDisplay(submission.status);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#16A34A";
    if (score >= 50) return "#CA8A04";

    return "#DC2626";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return "#22C55E";
    if (score >= 50) return "#EAB308";

    return "#EF4444";
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* BACK */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />

          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>

        {/* HEADER */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Chi tiết bài nộp</Text>

              <Text style={styles.idText}>ID: {submission.id}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: statusDisplay.bg,
                },
              ]}
            >
              {statusDisplay.icon}

              <Text
                style={{
                  color: statusDisplay.color,
                  fontWeight: "600",
                }}
              >
                {statusDisplay.label}
              </Text>
            </View>
          </View>

          {/* SCORE */}
          <View style={styles.scoreBox}>
            <View style={styles.scoreHeader}>
              <View style={styles.scoreLeft}>
                <Star size={20} color="#EAB308" />

                <Text style={styles.scoreLabel}>Điểm tổng</Text>
              </View>

              <Text
                style={[
                  styles.scoreValue,
                  {
                    color: getScoreColor(submission.overallScore),
                  },
                ]}
              >
                {submission.overallScore}
                <Text style={styles.scoreSub}>/100</Text>
              </Text>
            </View>

            <View style={styles.progressBg}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${Math.min(submission.overallScore, 100)}%`,
                    backgroundColor: getScoreBarColor(submission.overallScore),
                  },
                ]}
              />
            </View>
          </View>

          {/* INFO */}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Mã thử thách</Text>

              <Text style={styles.infoValue}>{submission.challengeId}</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoTitleRow}>
                <Clock size={12} color="#94A3B8" />

                <Text style={styles.infoLabel}>Ngày nộp</Text>
              </View>

              <Text style={styles.infoValue}>
                {new Date(submission.createdAt).toLocaleString("vi-VN")}
              </Text>
            </View>

            {!!submission.gradedAt && (
              <View style={styles.infoItem}>
                <View style={styles.infoTitleRow}>
                  <CheckCircle2 size={12} color="#94A3B8" />

                  <Text style={styles.infoLabel}>Ngày chấm</Text>
                </View>

                <Text style={styles.infoValue}>
                  {new Date(submission.gradedAt).toLocaleString("vi-VN")}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* AI FEEDBACK */}
        {!!submission.aiFeedback && (
          <View style={styles.card}>
            <View style={styles.feedbackHeader}>
              <View style={styles.feedbackIcon}>
                <FileText size={16} color="#2563EB" />
              </View>

              <Text style={styles.feedbackTitle}>Nhận xét từ AI</Text>
            </View>

            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackText}>{submission.aiFeedback}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  loadingContainer: {
    flex: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8FAFC",
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  backText: {
    marginTop: 14,
    color: "#2563EB",
    fontWeight: "600",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },

  backButtonText: {
    color: "#000",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 20,
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  idText: {
    color: "#64748B",
    fontSize: 13,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },

  scoreBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
  },

  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  scoreLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  scoreLabel: {
    fontWeight: "600",
    color: "#334155",
  },

  scoreValue: {
    fontSize: 32,
    fontWeight: "700",
  },

  scoreSub: {
    fontSize: 18,
    color: "#94A3B8",
    fontWeight: "400",
  },

  progressBg: {
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    borderRadius: 999,
  },

  infoGrid: {
    gap: 14,
  },

  infoItem: {
    borderWidth: 1,
    borderColor: "#F1F5F9",
    borderRadius: 14,
    padding: 14,
  },

  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 6,
  },

  infoValue: {
    color: "#0F172A",
    fontWeight: "600",
  },

  infoTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },

  feedbackHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },

  feedbackIcon: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  feedbackTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  feedbackBox: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    borderRadius: 14,
    padding: 16,
  },

  feedbackText: {
    color: "#334155",
    lineHeight: 24,
  },
});
