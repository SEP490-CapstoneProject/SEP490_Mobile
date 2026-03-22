import {
    Application,
    fetchApplications,
} from "@/services/user/application.api";
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

export default function InterviewManager() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<
    "ALL" | "REVIEWING" | "INTERVIEW" | "ACCEPTED"
  >("ALL");

  useEffect(() => {
    fetchApplications().then(setApplications);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "REVIEWING":
        return { bg: "#E6F0FF", text: "#3B82F6", label: "Đang xem xét" };
      case "ACCEPTED":
        return { bg: "#D1FAE5", text: "#10B981", label: "Đã nhận" };
      case "INTERVIEW":
        return { bg: "#FEE2E2", text: "#EF4444", label: "Phỏng vấn" };
      case "REJECTED":
        return { bg: "#E5E7EB", text: "#6B7280", label: "Từ chối" };
      default:
        return { bg: "#eee", text: "#000", label: status };
    }
  };

  const filtered = applications.filter((item) => {
    if (filter === "ALL") return true;
    return item.status === filter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../../assets/myApp/arrow.png")}
            style={styles.headerIcon}
          />
        </Pressable>
        <Text style={styles.title}>Quản lý hồ sơ</Text>
      </View>

      {/* FILTER */}
      <View style={styles.filterRow}>
        {[
          { key: "ALL", label: "Tất cả" },
          { key: "REVIEWING", label: "Đang xem xét" },
          { key: "INTERVIEW", label: "Phỏng vấn" },
          { key: "ACCEPTED", label: "Đã nhận" },
        ].map((item) => (
          <Pressable key={item.key} onPress={() => setFilter(item.key as any)}>
            <Text
              style={[
                styles.filterText,
                filter === item.key && styles.activeFilter,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((item) => {
          const status = getStatusStyle(item.status);

          return (
            <View key={item.applicationId} style={styles.card}>
              <View style={styles.row}>
                <Image
                  source={{ uri: item.company.logo }}
                  style={styles.logo}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.position}>{item.post.position}</Text>
                  <Text style={styles.company}>{item.company.companyName}</Text>
                </View>

                <View
                  style={[
                    styles.status,
                    { backgroundColor: status.bg, height: 25 },
                  ]}
                >
                  <Text style={{ color: status.text, fontSize: 12 }}>
                    {status.label}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.date}>
                  {new Date(item.appliedAt).toLocaleDateString("vi-VN")}
                </Text>

                <Pressable>
                  <Text style={styles.detail}>Chi tiết ›</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 15,
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  headerIcon: { width: 23, height: 23 },

  filterRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
    marginTop: 6,
    marginHorizontal: 25,
    justifyContent: "space-between",
  },

  filterText: {
    color: "#888",
  },

  activeFilter: {
    color: "#FF6B00",
    fontWeight: "600",
    borderBottomColor: "#FF6B00",
    borderBottomWidth: 1.2,
  },

  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    marginHorizontal: 14,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  position: {
    fontWeight: "600",
    fontSize: 14,
  },

  company: {
    color: "#777",
    fontSize: 12,
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  date: {
    color: "#888",
    fontSize: 12,
  },

  detail: {
    color: "#FF6B00",
  },
});
