import { InterviewItem } from "@/services/company/InterviewSchedule.api";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  data: InterviewItem | null;
};

export default function InterviewDetailModal({
  visible,
  onClose,
  data,
}: Props) {
  if (!data) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.container}
          onPress={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Image
              source={{ uri: data.candidate.coverImage }}
              style={styles.coverImage}
              resizeMode="cover"
            />
            <Image
              source={{ uri: data.candidate.avatar }}
              style={styles.avatar}
            />
          </View>

          {/* CONTENT */}
          <View style={styles.content}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.name}>{data.candidate.name}</Text>
                <Text style={styles.position}>{data.post.position}</Text>
              </View>
              <View style={styles.round}>
                <Text
                  style={{ color: "#B45309", fontWeight: "bold", fontSize: 13 }}
                >
                  Vòng {data.round}
                </Text>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Image
                source={require("../assets/myApp/clock.png")}
                style={styles.icon}
              />
              <Text style={styles.label}>Thời gian</Text>
            </View>

            <Text>
              {data.time}, {data.date}
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                source={require("../assets/myApp/maps-and-flags1.png")}
                style={styles.icon}
              />
              <Text style={styles.label}>Địa điểm</Text>
            </View>

            <Text>
              {data.type === "ONLINE"
                ? "Trực tuyến"
                : `${data.building} - ${data.room}`}
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                source={require("../assets/myApp/avatar.png")}
                style={styles.icon}
              />
              <Text style={styles.label}>Người phỏng vấn</Text>
            </View>

            <Text>{data.interviewerName}</Text>

            {/* BUTTON */}
            <Pressable style={styles.primaryBtn}>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Nhắn tin
              </Text>
            </Pressable>

            <Pressable style={styles.cancelBtn} onPress={onClose}>
              <Text style={{ color: "#EF4444", textAlign: "center" }}>
                Hủy lịch phỏng vấn
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },

  header: {},
  coverImage: {
    height: 200,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "absolute",
    bottom: 10,
    left: 10,
    borderColor: "#FFFFFF",
    borderWidth: 2,
  },

  content: {
    padding: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  position: {
    color: "#64748B",
    marginBottom: 10,
  },

  label: {
    color: "#6B7280",
    fontWeight: "600",
  },

  primaryBtn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  round: {
    backgroundColor: "#FEF3C7",
    width: 65,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: "#137FEC",
  },
});
