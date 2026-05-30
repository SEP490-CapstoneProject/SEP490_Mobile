import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  AlertCircle,
  ArrowLeft,
  Award,
  Clock,
  Code2,
  ExternalLink,
  Link as LinkIcon,
  Send,
} from "lucide-react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
  createSubmission,
  fetchPublicChallengeDetail,
  getMyChallengeSubmissions,
} from "@/services/challenge.api";

import CustomLoading from "@/components/CustomLoading";
import { Challenge, MyChallengeSubmissionsResponse } from "@/utils/challenge";
import { showSuccess } from "@/utils/toast";

export default function ChallengeDetailTalent() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const [submissions, setSubmissions] =
    useState<MyChallengeSubmissionsResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"details" | "criteria">("details");

  const [code, setCode] = useState("");

  const [submissionLink, setSubmissionLink] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setIsLoading(true);

        const data = await fetchPublicChallengeDetail(String(id));
        setChallenge(data);
      } catch (err: any) {
        setError(err?.message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const loadSubmissions = async () => {
      try {
        setIsLoadingSubmissions(true);

        const data = await getMyChallengeSubmissions(String(id));

        setSubmissions(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadingSubmissions(false);
      }
    };

    loadSubmissions();
  }, [id]);

  const handleSubmit = async () => {
    if (!code.trim() && !submissionLink.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);

      await createSubmission(String(id), {
        content: code,
        githubUrl: submissionLink,
      });

      setCode("");
      setSubmissionLink("");

      const refreshed = await getMyChallengeSubmissions(String(id));

      setSubmissions(refreshed);
      showSuccess("Thành công", "");
    } catch (err) {
      console.log(err);
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

  if (error || !challenge) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error || "Không tìm thấy thử thách"}
        </Text>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  const deadline = new Date(challenge.deadline);

  const daysLeft = Math.ceil(
    (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  const difficulty =
    challenge.activeVersion?.difficultyLabel ||
    challenge.difficultyLabel ||
    "Unknown";

  const difficultyConfig: Record<
    string,
    { label: string; bg: string; color: string }
  > = {
    Easy: {
      label: "Dễ",
      bg: "#DCFCE7",
      color: "#166534",
    },
    Medium: {
      label: "Vừa",
      bg: "#FEF9C3",
      color: "#854D0E",
    },
    Hard: {
      label: "Khó",
      bg: "#FEE2E2",
      color: "#991B1B",
    },
  };

  const currentDifficulty = difficultyConfig[difficulty] || {
    label: difficulty,
    bg: "#E2E8F0",
    color: "#334155",
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 60,
        paddingTop: 50,
      }}
    >
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft size={24} color="#000" />

        <Text style={styles.backText}>Quay lại</Text>
      </Pressable>

      <Text style={styles.title}>{challenge.title}</Text>

      <View style={styles.row}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: currentDifficulty.bg,
            },
          ]}
        >
          <Text
            style={{
              color: currentDifficulty.color,
              fontWeight: "600",
            }}
          >
            {currentDifficulty.label}
          </Text>
        </View>

        {daysLeft > 0 ? (
          <View style={styles.row}>
            <Clock size={14} color="#EA580C" />

            <Text style={styles.deadlineText}>Còn {daysLeft} ngày</Text>
          </View>
        ) : (
          <View style={styles.row}>
            <AlertCircle size={14} color="#DC2626" />

            <Text style={[styles.deadlineText, { color: "#DC2626" }]}>
              Đã hết hạn
            </Text>
          </View>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("details")}
          style={[styles.tab, activeTab === "details" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "details" && styles.activeTabText,
            ]}
          >
            Chi tiết
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("criteria")}
          style={[styles.tab, activeTab === "criteria" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "criteria" && styles.activeTabText,
            ]}
          >
            Tiêu chí
          </Text>
        </TouchableOpacity>
      </View>

      {/* Details */}
      {activeTab === "details" && (
        <View style={styles.card}>
          {!!challenge.description && (
            <>
              <Text style={styles.sectionTitle}>Mô tả</Text>

              <Text style={styles.description}>{challenge.description}</Text>
            </>
          )}

          {!!challenge.expectedSolution && (
            <>
              <Text style={styles.sectionTitle}>Giải pháp mong đợi</Text>

              <Text style={styles.description}>
                {challenge.expectedSolution}
              </Text>
            </>
          )}
        </View>
      )}

      {/* Criteria */}
      {activeTab === "criteria" && (
        <View style={styles.card}>
          {challenge.activeVersion?.criteria?.map((c: any) => (
            <View key={c.id} style={styles.criteriaBox}>
              <Text style={styles.criteriaTitle}>{c.name}</Text>

              <Text style={styles.criteriaDesc}>{c.description}</Text>

              <Text style={styles.criteriaScore}>{c.maxScore} điểm</Text>
            </View>
          ))}
        </View>
      )}

      {/* Submit */}
      <View style={styles.card}>
        <View style={styles.rowGap}>
          <Send size={18} color="#2563EB" />

          <Text style={styles.submitTitle}>Nộp bài</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.rowGap}>
            <Code2 size={16} color="#475569" />

            <Text style={styles.label}>Mã nguồn</Text>
          </View>

          <TextInput
            multiline
            value={code}
            onChangeText={setCode}
            placeholder="Dán code tại đây..."
            style={styles.textArea}
            textAlignVertical="top"
            placeholderTextColor="#000000"
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.rowGap}>
            <LinkIcon size={16} color="#475569" />

            <Text style={styles.label}>Link GitHub</Text>
          </View>

          <TextInput
            value={submissionLink}
            onChangeText={setSubmissionLink}
            placeholder="https://github.com/..."
            style={styles.input}
            placeholderTextColor="#000000"
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting || daysLeft <= 0}
          style={[
            styles.submitButton,
            (isSubmitting || daysLeft <= 0) && {
              opacity: 0.5,
            },
          ]}
        >
          <Send size={18} color="#fff" />

          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Đang nộp..." : "Nộp bài"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* My submissions */}
      <View style={styles.card}>
        <View
          style={[
            styles.row,
            {
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={styles.rowGap}>
            <Award size={20} color="#2563EB" />

            <Text style={styles.submitTitle}>Bài nộp của tôi</Text>
          </View>

          <View style={styles.countBox}>
            <Text style={styles.countText}>{submissions?.totalCount || 0}</Text>
          </View>
        </View>

        {isLoadingSubmissions ? (
          <Text
            style={{
              marginTop: 20,
            }}
          >
            Đang tải...
          </Text>
        ) : submissions?.items?.length ? (
          submissions.items.map((sub: any) => (
            <View key={sub.id} style={styles.submissionBox}>
              <Text style={styles.submissionDate}>
                {new Date(sub.submittedAt).toLocaleString("vi-VN")}
              </Text>

              {sub.evaluationScore !== null ? (
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreNumber}>{sub.evaluationScore}</Text>

                  <Text>điểm</Text>
                </View>
              ) : (
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreText}>{sub.submissionStatus}</Text>
                </View>
              )}

              {!!sub.gitHubLink && (
                <TouchableOpacity style={styles.githubLink}>
                  <ExternalLink size={16} color="#2563EB" />

                  <Text
                    style={{
                      color: "#2563EB",
                    }}
                  >
                    GitHub
                  </Text>
                </TouchableOpacity>
              )}

              {!!sub.submissionContent && (
                <View style={styles.codeBox}>
                  <Text style={styles.codeText}>{sub.submissionContent}</Text>
                </View>
              )}

              {!!sub.feedback && (
                <View style={styles.feedbackBox}>
                  <Text>{sub.feedback}</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptySubmission}>
            <Code2 size={40} color="#94A3B8" />

            <Text
              style={{
                marginTop: 10,
              }}
            >
              Chưa có bài nộp
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  loadingContainer: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    color: "#DC2626",
    marginBottom: 12,
  },

  backLink: {
    color: "#2563EB",
    fontWeight: "600",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },

  backText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  deadlineText: {
    color: "#EA580C",
    fontWeight: "600",
  },

  tabs: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  tab: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  activeTab: {
    borderBottomColor: "#2563EB",
  },

  tabText: {
    color: "#64748B",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#2563EB",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
    marginTop: 16,
  },

  description: {
    color: "#475569",
    lineHeight: 24,
  },

  criteriaBox: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    marginBottom: 14,
  },

  criteriaTitle: {
    fontWeight: "700",
    fontSize: 16,
  },

  criteriaDesc: {
    color: "#64748B",
    marginTop: 6,
  },

  criteriaScore: {
    color: "#2563EB",
    marginTop: 10,
    fontWeight: "600",
  },

  submitTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  label: {
    fontWeight: "600",
    color: "#0F172A",
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    height: 180,
    marginTop: 10,
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },

  submitButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  countBox: {
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  countText: {
    fontWeight: "700",
  },

  submissionBox: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
  },

  submissionDate: {
    color: "#64748B",
    marginBottom: 12,
  },

  scoreBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    marginBottom: 14,
  },

  scoreNumber: {
    fontSize: 21,
    fontWeight: "600",
    color: "#B45309",
  },

  scoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#B45309",
  },

  githubLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },

  codeBox: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },

  codeText: {
    color: "#F8FAFC",
    fontFamily: "monospace",
  },

  feedbackBox: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 12,
    padding: 14,
  },

  emptySubmission: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
});
