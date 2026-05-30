import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function SkillHistoryModal({ visible, onClose, skills }: any) {
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
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Kỹ năng tích lũy</Text>

            <Pressable onPress={onClose}>
              <Text style={{ fontSize: 22 }}>✕</Text>
            </Pressable>
          </View>
          {skills?.length > 0 && (
            <ScrollView showsVerticalScrollIndicator={false}>
              {skills?.map((item: any) => (
                <View key={item.skillId} style={styles.card}>
                  <View style={styles.row}>
                    <Text style={styles.skillName}>{item.skillName}</Text>

                    <View style={styles.pointBox}>
                      <Text style={styles.point}>{item.totalPoints} điểm</Text>
                    </View>
                  </View>

                  <Text style={styles.challenge}>
                    {item.challengeCount} challenge hoàn thành
                  </Text>

                  <View style={styles.progressBg}>
                    <View
                      style={[
                        styles.progress,
                        {
                          width: `${Math.min(item.masteryScore || 0, 100)}%`,
                        },
                      ]}
                    />
                  </View>

                  <View style={{ marginTop: 12 }}>
                    <Text style={styles.timeText}>
                      Lần đầu: {formatDateTime(item.firstVerifiedAt)}
                    </Text>

                    <Text style={styles.timeText}>
                      Gần nhất: {formatDateTime(item.lastVerifiedAt)}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
          {skills?.length === 0 && (
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={{ color: "#64748B", fontSize: 16 }}>
                Người dùng này chưa có kỹ năng nào được tích lũy.
              </Text>
            </View>
          )}

          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Đóng</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },

  container: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    maxHeight: "85%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  skillName: {
    fontWeight: "700",
    fontSize: 16,
  },

  challenge: {
    color: "#64748B",
    marginTop: 4,
  },

  pointBox: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  point: {
    color: "#16A34A",
    fontWeight: "700",
    fontSize: 12,
  },

  progressBg: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    marginTop: 12,
  },

  progress: {
    height: 8,
    backgroundColor: "#16A34A",
    borderRadius: 20,
  },

  closeBtn: {
    backgroundColor: "#5B4BC4",
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 15,
  },

  timeText: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
  },
});
