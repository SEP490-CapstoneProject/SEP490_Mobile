import {
  ApplicationManager,
  fetchApplications,
} from "@/services/company/applicationManager";
import { formatTimeAgo } from "@/services/setTime";
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

export default function ApplicationManagement() {
  const router = useRouter();
  const [filter, setFilter] = useState<"ALL" | "RECENT" | "SIX_MONTH" | "OLD">(
    "ALL",
  );
  const [applications, setApplications] = useState<ApplicationManager[]>([]);

  useEffect(() => {
    fetchApplications().then(setApplications);
  }, []);

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const getFilteredApplications = () => {
    const now = new Date();

    return applications.filter((app) => {
      const appliedDate = parseDate(app.appliedAt);

      const diffTime = now.getTime() - appliedDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (filter === "RECENT") {
        return diffDays <= 7;
      }

      if (filter === "SIX_MONTH") {
        return diffDays <= 180;
      }

      if (filter === "OLD") {
        return diffDays > 180;
      }

      return true;
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.left}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../../../../assets/myApp/arrow.png")}
              style={styles.headerIcon}
            />
          </Pressable>
          <Text style={styles.title}>Quản lý tuyển dụng</Text>
        </View>
      </View>
      {/** title */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#F9FAFB",
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: 15, color: "#6B7280", width: 200 }}>
          Quản lý, theo dõi các yêu cầu ứng tuyển
        </Text>
        <View
          style={{
            borderColor: "#E2E8F0",
            borderWidth: 1.5,
            paddingHorizontal: 7,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: "#F9FAFB",
            height: 30,
          }}
        >
          <Text style={{ color: "#111827" }}>Đánh dấu tất cả</Text>
        </View>
      </View>
      <View style={styles.sortContainer}>
        <Pressable
          style={[
            styles.sortButton,
            filter == "ALL" && { backgroundColor: "#3B82F6" },
          ]}
          onPress={() => setFilter("ALL")}
        >
          <Text
            style={[
              styles.textButtonSort,
              filter == "ALL" && { color: "#FFFFFF" },
            ]}
          >
            Tất cả
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.sortButton,
            filter == "RECENT" && { backgroundColor: "#3B82F6" },
          ]}
          onPress={() => setFilter("RECENT")}
        >
          <Text
            style={[
              styles.textButtonSort,
              filter == "RECENT" && { color: "#FFFFFF" },
            ]}
          >
            Gần đây
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.sortButton,
            filter == "SIX_MONTH" && { backgroundColor: "#3B82F6" },
          ]}
          onPress={() => setFilter("SIX_MONTH")}
        >
          <Text
            style={[
              styles.textButtonSort,
              filter == "SIX_MONTH" && { color: "#FFFFFF" },
            ]}
          >
            6 tháng qua
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.sortButton,
            filter == "OLD" && { backgroundColor: "#3B82F6" },
          ]}
          onPress={() => setFilter("OLD")}
        >
          <Text
            style={[
              styles.textButtonSort,
              filter == "OLD" && { color: "#FFFFFF" },
            ]}
          >
            Cũ hơn
          </Text>
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {getFilteredApplications().map((item) => (
          <View key={item.applicationId} style={styles.contentContainer}>
            <View style={styles.headerContentContainer}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: item.candidate.avatar }}
                  style={styles.avatar}
                />
                <View style={{ marginLeft: 7 }}>
                  <Text style={styles.name}>{item.candidate.name}</Text>
                  <Text style={styles.position}>{item.post.position}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../../../assets/myApp/calendar1.png")}
                      style={styles.calendarIcon}
                    />
                    <Text style={{ color: "#6B7280", fontSize: 12 }}>
                      {formatTimeAgo(item.appliedAt)}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                {item.status == "NEW" && (
                  <View
                    style={{
                      backgroundColor: "#EFF6FF",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#306EE8",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Mới
                    </Text>
                  </View>
                )}
                {item.status == "REVIEWING" && (
                  <View
                    style={{
                      backgroundColor: "#D1FAE5",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#059669",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Đang xem xét
                    </Text>
                  </View>
                )}
                {item.status == "INTERVIEW" && (
                  <View
                    style={{
                      backgroundColor: "#FFD6D6",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FF4848",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Phỏng vấn
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 5 }}>
              <Pressable
                style={{
                  backgroundColor: "#3B82F6",
                  borderRadius: 10,
                  paddingHorizontal: 7,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 13 }}>
                  Xem hồ sơ
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#EFF6FF",
                  borderRadius: 10,
                  paddingHorizontal: 7,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ color: "#3B82F6", fontSize: 13 }}>nhắn tin</Text>
              </Pressable>
              {item.status == "INTERVIEW" && (
                <Pressable
                  style={{
                    backgroundColor: "#E2E8F0",
                    borderRadius: 10,
                    paddingHorizontal: 7,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: "#475569", fontSize: 13 }}>
                    Chi tiết
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 12,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingRight: 20,
  },

  headerIcon: { width: 23, height: 23 },
  title: { fontSize: 20, fontWeight: "bold" },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1.4,
  },
  sortButton: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 10,
  },
  textButtonSort: {
    color: "#3B82F6",
  },
  calendarIcon: {
    width: 13,
    height: 13,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  contentContainer: {
    marginHorizontal: 14,
    borderColor: "#E2E8F0",
    borderWidth: 1.4,
    paddingHorizontal: 4,
    borderRadius: 10,
    marginTop: 8,
  },
  headerContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
  },
  name: {
    fontSize: 16.5,
    fontWeight: "bold",
  },
  position: {
    fontSize: 15,
    color: "#6B7280",
    width: 150,
    lineHeight: 19,
  },
});
