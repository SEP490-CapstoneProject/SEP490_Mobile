import { useRouter } from "expo-router";
import { Clock } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import CustomLoading from "@/components/CustomLoading";
import { fetchPublicChallenges } from "@/services/challenge.api";
import { Ionicons } from "@expo/vector-icons";
import { Challenge } from "../../../../utils/challenge";

function ChallengeCard({
  challenge,
  onPress,
}: {
  challenge: Challenge;
  onPress: () => void;
}) {
  const deadline = new Date(challenge.deadline);
  const now = new Date();

  const daysLeft = Math.ceil(
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
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
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={2}>
            {challenge.title}
          </Text>

          <View style={styles.badgeRow}>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: currentDifficulty.bg,
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  {
                    color: currentDifficulty.color,
                  },
                ]}
              >
                {currentDifficulty.label}
              </Text>
            </View>

            {daysLeft > 0 && (
              <View style={styles.daysLeft}>
                <Clock size={14} color="#EA580C" />
                <Text style={styles.daysLeftText}>Còn {daysLeft} ngày</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {challenge.description && (
        <Text style={styles.description} numberOfLines={2}>
          {challenge.description}
        </Text>
      )}

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Hạn chót:</Text>
          <Text style={styles.infoValue}>
            {deadline.toLocaleDateString("vi-VN")}
          </Text>
        </View>

        {challenge.activeVersion?.criteria && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tiêu chí:</Text>
            <Text style={styles.infoValue}>
              {challenge.activeVersion.criteria.length} tiêu chí
            </Text>
          </View>
        )}
      </View>

      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Xem chi tiết</Text>
      </Pressable>
    </View>
  );
}

export default function ChallengeTalentScreen() {
  const router = useRouter();

  const [publicChallenges, setPublicChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPublicChallenges = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchPublicChallenges(0, 50);

      setPublicChallenges(response.items || []);
    } catch (err: any) {
      setError(err?.message || "Có lỗi khi tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPublicChallenges();
  }, []);

  const handleChallengeClick = (challenge: Challenge) => {
    router.push({
      pathname: `/(tabs)/home/challenge/ChallengeDetailTalent`,
      params: {
        id: String(challenge.id),
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CustomLoading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.screenTitle}>Thử thách đang diễn ra</Text>

            <Text style={styles.screenSubtitle}>
              Khám phá và tham gia các thử thách thú vị
            </Text>
          </View>
          <Pressable
            style={[styles.tabBtn]}
            onPress={() => {
              router.push("/(tabs)/home/challenge/MyChallenges");
            }}
          >
            <Text style={styles.tabText}>Xem thử thách đã hoàn thành</Text>
            <Ionicons name="arrow-forward-circle" size={20} color="#2563EB" />
          </Pressable>
        </View>

        {/* Error */}
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Empty */}
        {publicChallenges.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Clock size={48} color="#94A3B8" />

            <Text style={styles.emptyTitle}>Chưa có thử thách nào</Text>

            <Text style={styles.emptySubtitle}>
              Vui lòng quay lại sau để xem các thử thách mới
            </Text>
          </View>
        ) : (
          <FlatList
            data={publicChallenges}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <ChallengeCard
                challenge={item}
                onPress={() => handleChallengeClick(item)}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  loadingContainer: {
    flex: 1,
  },

  headerContainer: {
    marginBottom: 24,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 6,
  },

  backText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 15,
  },

  screenTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  screenSubtitle: {
    color: "#64748B",
    marginTop: 4,
    fontSize: 14,
  },

  errorBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },

  errorText: {
    color: "#B91C1C",
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 14,
  },

  emptySubtitle: {
    color: "#64748B",
    marginTop: 6,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,

    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  header: {
    marginBottom: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 13,
    fontWeight: "600",
  },

  daysLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  daysLeftText: {
    color: "#EA580C",
    fontWeight: "600",
    fontSize: 13,
  },

  description: {
    color: "#475569",
    marginBottom: 16,
    lineHeight: 20,
  },

  infoBox: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 14,
    marginBottom: 16,
    gap: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoLabel: {
    color: "#64748B",
    fontSize: 14,
  },

  infoValue: {
    color: "#0F172A",
    fontWeight: "600",
    fontSize: 14,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    padding: 4,
    marginTop: 12,
  },

  tabBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },

  tabText: {
    color: "#3B82F6",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#FFF",
    fontWeight: "700",
  },
});
