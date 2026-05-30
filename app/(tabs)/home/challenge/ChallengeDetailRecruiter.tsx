import {
  ActivityIndicator,
  Image,
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
  Send,
} from "lucide-react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import CustomLoading from "@/components/CustomLoading";
import {
  approveAndPublishChallenge,
  getChallengeDetail,
  getChallengeSubmissions,
  submitChallengeForReview,
} from "@/services/challenge.api";
import { formatToLocalTime } from "@/services/time";
import { Challenge } from "@/utils/challenge";
import { showError, showSuccess } from "@/utils/toast";

export default function ChallengeDetailRecruiter() {
  const router = useRouter();

  const { challengeId } = useLocalSearchParams<{
    challengeId: string;
  }>();

  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const [submissions, setSubmissions] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);

  const loadChallengeSubmissions = useCallback(async (id: string) => {
    try {
      setIsLoadingSubmissions(true);

      const res = await getChallengeSubmissions(id);

      setSubmissions(res.items || []);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoadingSubmissions(false);
    }
  }, []);

  const loadChallengeDetail = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!challengeId) return;

      const challengeData = await getChallengeDetail(challengeId);

      setChallenge(challengeData);

      await loadChallengeSubmissions(challengeId);
    } catch (err: any) {
      showError("Có lỗi tải dữ liệu", "err?.message");
    } finally {
      setIsLoading(false);
    }
  }, [challengeId, loadChallengeSubmissions]);

  useEffect(() => {
    if (challengeId) {
      loadChallengeDetail();
    }
  }, [challengeId, loadChallengeDetail]);

  const handleSubmitForReview = async () => {
    if (!challengeId || !challenge) return;

    try {
      setIsSubmitting(true);

      const updatedChallenge = await submitChallengeForReview(challengeId);

      setChallenge(updatedChallenge);

      showSuccess("Gửi duyệt thành công", "");
    } catch (err: any) {
      showError("Có lỗi", "err?.message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishNow = async () => {
    if (!challengeId || !challenge) return;

    try {
      setIsSubmitting(true);

      const updatedChallenge = await approveAndPublishChallenge(challengeId);

      setChallenge(updatedChallenge);

      showSuccess("Xuất bản thành công", "");
    } catch (err: any) {
      showError("Có lỗi", "err?.message");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CustomLoading />
      </View>
    );
  }

  if (!challenge) {
    return (
      <View style={styles.emptyPage}>
        <AlertCircle size={48} color="#DC2626" />

        <Text style={styles.emptyTitle}>Không tìm thấy thử thách</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const createdDate = formatToLocalTime(challenge.createdAt);

  const deadline = formatToLocalTime(challenge.deadline);

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "Draft":
        return {
          label: "Nháp",
          bg: "#E2E8F0",
          color: "#1E293B",
        };

      case "PendingReview":
        return {
          label: "Chờ duyệt",
          bg: "#FEF3C7",
          color: "#92400E",
        };

      case "Published":
        return {
          label: "Đã xuất bản",
          bg: "#DCFCE7",
          color: "#166534",
        };

      case "Rejected":
        return {
          label: "Đã từ chối",
          bg: "#FEE2E2",
          color: "#991B1B",
        };

      case "Expired":
        return {
          label: "Đã hết hạn",
          bg: "#FEE2E2",
          color: "#991B1B",
        };

      default:
        return {
          label: status,
          bg: "#E2E8F0",
          color: "#1E293B",
        };
    }
  };

  const statusDisplay = getStatusDisplay(challenge.status ?? "");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>

        {/* Challenge */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{challenge.title}</Text>

            <View
              style={[
                styles.badge,
                {
                  backgroundColor: statusDisplay.bg,
                },
              ]}
            >
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

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mô tả</Text>

            <Text style={styles.description}>{challenge.description}</Text>
          </View>

          {/* Expected Solution */}
          {!!challenge.expectedSolution && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Giải pháp mong đợi</Text>

              <Text style={styles.description}>
                {challenge.expectedSolution}
              </Text>
            </View>
          )}

          {/* Info */}
          <View style={styles.infoBox}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Ngày tạo</Text>
              <Text style={styles.infoValue}>{createdDate}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Hạn chót</Text>
              <Text style={styles.infoValue}>{deadline}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Trạng thái</Text>
              <Text style={styles.infoValue}>{statusDisplay.label}</Text>
            </View>

            {!!challenge.reviewedById && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Duyệt bởi</Text>
                <Text style={styles.infoValue}>
                  ID: {challenge.reviewedById}
                </Text>
              </View>
            )}
          </View>

          {/* Actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                challenge.status !== "Draft" && {
                  opacity: 0.5,
                },
              ]}
              disabled={isSubmitting || challenge.status !== "Draft"}
              onPress={handleSubmitForReview}
            >
              <Send size={18} color="#fff" />

              <Text style={styles.primaryButtonText}>Gửi duyệt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.successButton}
              disabled={isSubmitting}
              onPress={handlePublishNow}
            >
              <CheckCircle2 size={18} color="#fff" />

              <Text style={styles.primaryButtonText}>Xuất bản</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SUBMISSIONS */}
        <View style={styles.card}>
          <Text style={styles.submissionTitle}>Danh sách đã nộp</Text>

          {isLoadingSubmissions ? (
            <ActivityIndicator
              size="large"
              color="#2563EB"
              style={{ marginTop: 20 }}
            />
          ) : submissions.length === 0 ? (
            <View style={styles.emptySubmission}>
              <AlertCircle size={48} color="#94A3B8" />

              <Text style={{ marginTop: 10, color: "#64748B" }}>
                Chưa có bài nộp nào
              </Text>
            </View>
          ) : (
            <View style={{ gap: 16 }}>
              {submissions.map((submission) => (
                <View key={submission.id} style={styles.submissionCard}>
                  <View style={styles.userRow}>
                    <Image
                      source={{
                        uri:
                          submission.userAvatar ||
                          "https://via.placeholder.com/40",
                      }}
                      style={styles.avatar}
                    />

                    <View style={{ flex: 1 }}>
                      <Text style={styles.userName}>{submission.userName}</Text>

                      <Text style={styles.userEmail}>
                        {submission.userEmail}
                      </Text>
                    </View>

                    {submission.evaluationScore !== null ? (
                      <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                          {submission.evaluationScore}
                        </Text>

                        <Text>điểm</Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: 43,
                          height: 43,
                          borderRadius: 999,
                          backgroundColor: "#FEF3C7",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={[
                            styles.scoreText,
                            { fontSize: 12, color: "#B45309" },
                          ]}
                        >
                          {submission.submissionStatus}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.submissionInfo}>
                    <Text style={styles.infoSmall}>
                      Nộp lúc: {formatToLocalTime(submission.submittedAt)}
                    </Text>

                    <Text style={styles.infoSmall}>
                      Lần nộp: {submission.attemptCount}
                    </Text>
                  </View>

                  <View style={styles.submissionContent}>
                    <Text style={styles.label}>Mô tả bài làm</Text>
                    <Text style={styles.value}>
                      {submission.submissionContent || "Không có mô tả"}
                    </Text>

                    {!!submission.githubLink && (
                      <>
                        <Text style={styles.label}>Github</Text>
                        <Text style={styles.link}>{submission.githubLink}</Text>
                      </>
                    )}

                    {!!submission.feedback && (
                      <View style={styles.feedbackBox}>
                        <Text style={styles.label}>Nhận xét</Text>
                        <Text style={styles.feedbackText}>
                          {submission.feedback}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
    paddingTop: 40,
  },

  loadingContainer: {
    flex: 1,
  },

  emptyPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  backText: {
    marginTop: 16,
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
    color: "#2563EB",
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

  titleRow: {
    marginBottom: 20,
  },

  title: {
    fontSize: 23,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#0F172A",
  },

  description: {
    color: "#475569",
    lineHeight: 24,
  },

  infoBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 16,
    gap: 14,
    marginBottom: 24,
  },

  infoItem: {},

  infoLabel: {
    color: "#64748B",
    marginBottom: 4,
    fontSize: 13,
  },

  infoValue: {
    color: "#0F172A",
    fontWeight: "600",
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  successButton: {
    flex: 1,
    backgroundColor: "#16A34A",
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  submissionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 20,
  },

  emptySubmission: {
    alignItems: "center",
    paddingVertical: 40,
  },

  submissionCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 16,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    marginRight: 12,
  },

  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  userEmail: {
    color: "#64748B",
    marginTop: 2,
  },

  scoreBox: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  scoreText: {
    color: "#1D4ED8",
    fontWeight: "700",
  },

  submissionInfo: {
    gap: 6,
    marginBottom: 14,
  },

  infoSmall: {
    color: "#475569",
    fontSize: 13,
  },

  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },

  detailButtonText: {
    color: "#2563EB",
    fontWeight: "600",
  },
  submissionContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 8,
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
  },

  link: {
    fontSize: 14,
    color: "#2563EB",
    textDecorationLine: "underline",
  },

  feedbackBox: {
    marginTop: 10,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },

  feedbackText: {
    color: "#334155",
    lineHeight: 20,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#FEF3C7",
    marginTop: 8,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#B45309",
  },
});
