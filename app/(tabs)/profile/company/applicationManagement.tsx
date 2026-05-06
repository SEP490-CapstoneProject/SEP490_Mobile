import CustomLoading from "@/components/CustomLoading";
import {
  fetchCompanyApplications,
  updateApplicationStatus,
} from "@/services/aplication.api";

import {
  createConnection,
  getConnectionStatus,
  getRoomSummaryByConnection,
  updateConnectionStatus,
} from "@/services/chat.api";
import { formatTimeAgo } from "@/services/setTime";
import { getAuth } from "@/services/storage";
import { showError } from "@/utils/toast";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ApplicationManagement() {
  const router = useRouter();
  const [filter, setFilter] = useState<
    "ALL" | "WAITING" | "REVIEWING" | "ACCEPTED" | "REJECTED"
  >("ALL");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const STATUS_MAP = {
    WAITING: 0,
    REVIEWING: 1,
    ACCEPTED: 2,
    REJECTED: 3,
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await fetchCompanyApplications(page, 10);

      const items = data.items ?? data;
      setApplications(items);

      setPage(1);
    } catch (err) {
      showError("Lỗi", err as string);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);

      const nextPage = page + 1;

      const data = await fetchCompanyApplications(nextPage, 10);
      const items = data.items ?? data;

      setApplications((prev) => [...prev, ...items]);
      setPage(nextPage);
      setLoading(false);
    } catch (err) {
      showError("Lỗi", err as string);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredApplications = () => {
    if (filter === "ALL") return applications;

    return applications.filter((app) => {
      if (filter === "REVIEWING") {
        return app.status === "REVIEWING";
      }

      return app.status === filter;
    });
  };

  const openStatusModal = (app: any) => {
    setSelectedApp(app);
    setStatusModalVisible(true);
  };

  const updateStatus = async (status: string) => {
    try {
      const statusValue = STATUS_MAP[status as keyof typeof STATUS_MAP];
      await updateApplicationStatus(selectedApp.applicationId, statusValue);
      setApplications((prev) =>
        prev.map((app) =>
          app.applicationId === selectedApp.applicationId
            ? { ...app, status }
            : app,
        ),
      );

      setStatusModalVisible(false);
    } catch (err) {
      showError("Lỗi", err as string);
      setStatusModalVisible(false);
    }
  };

  const handleStartChat = async (targetUserId: number, profileId: number) => {
    try {
      const currentUser = await getAuth();
      const currentUserId = Number(currentUser?.id);

      const statusRes = await getConnectionStatus(currentUserId, targetUserId);
      console.log("statusRes", statusRes);

      let finalConnectionId = 0;

      if (!statusRes?.status || statusRes.status === "null") {
        const createRes = await createConnection({
          userIdFrom: currentUserId,
          userIdTo: targetUserId,
          profileId,
        });

        finalConnectionId = createRes?.id;

        await updateConnectionStatus(finalConnectionId, "MATCHED");
        console.log("createRes", createRes);
      } else if (statusRes.status === "PENDING") {
        await updateConnectionStatus(statusRes.connectionId, "MATCHED");
        finalConnectionId = statusRes.connectionId;
        console.log("update to MATCHED", statusRes);
      }
      console.log("finalConnectionId", finalConnectionId, currentUserId);
      const roomSummary = await getRoomSummaryByConnection(
        finalConnectionId,
        currentUserId,
      );
      console.log("roomSummary", roomSummary);
      router.push({
        pathname: ` /(tabs)/chat/${roomSummary.roomId}`,
        params: {
          roomId: roomSummary.roomId,
          name: roomSummary.name,
          avatar: roomSummary.avatar,
          coverImage: roomSummary.coverImage,
          role: roomSummary.role,
        },
      } as any);
    } catch (err) {
      showError("handleStartChat error", err as string);
    }
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sortContainer}
      >
        {[
          { key: "ALL", label: "Tất cả" },
          { key: "WAITING", label: "Mới" },
          { key: "REVIEWING", label: "Đang xem xét" },
          { key: "ACCEPTED", label: "Đã nhận" },
          { key: "REJECTED", label: "Từ chối" },
        ].map((item) => (
          <Pressable
            key={item.key}
            style={[
              styles.sortButton,
              filter === item.key && { backgroundColor: "#3B82F6" },
            ]}
            onPress={() => setFilter(item.key as any)}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.textButtonSort,
                filter === item.key && { color: "#FFFFFF" },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      {loading ? (
        <CustomLoading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleLoadMore}
        >
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
                  {item.status == "WAITING" && (
                    <Pressable
                      style={{
                        backgroundColor: "#EFF6FF",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 10,
                      }}
                      onPress={() => openStatusModal(item)}
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
                    </Pressable>
                  )}
                  {item.status == "ACCEPTED" && (
                    <Pressable
                      style={{
                        backgroundColor: "#D1FAE5",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 10,
                      }}
                      onPress={() => openStatusModal(item)}
                    >
                      <Text
                        style={{
                          color: "#059669",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Đã chấp nhận
                      </Text>
                    </Pressable>
                  )}
                  {item.status == "REVIEWING" && (
                    <Pressable
                      style={{
                        backgroundColor: "#FFD6D6",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 10,
                      }}
                      onPress={() => openStatusModal(item)}
                    >
                      <Text
                        style={{
                          color: "#306EE8",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Đang xem xét
                      </Text>
                    </Pressable>
                  )}
                  {item.status == "REJECTED" && (
                    <Pressable
                      style={{
                        backgroundColor: "#E2E8F0",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 10,
                      }}
                      onPress={() => openStatusModal(item)}
                    >
                      <Text
                        style={{
                          color: "#FF4848",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Từ chối
                      </Text>
                    </Pressable>
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
                  onPress={() => {
                    router.push({
                      pathname: `/(tabs)/profile/viewPortfolio`,
                      params: { portId: item.portfolioId },
                    });
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
                  onPress={() => handleStartChat(item.candidate.userId, 0)}
                >
                  <Text style={{ color: "#3B82F6", fontSize: 13 }}>
                    nhắn tin
                  </Text>
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
      )}

      <Modal visible={statusModalVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "80%",
              borderRadius: 15,
              padding: 15,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
            >
              Cập nhật trạng thái
            </Text>
            {[
              { key: "WAITING", label: "Mới" },
              { key: "REVIEWING", label: "Đang xem xét" },
              { key: "ACCEPTED", label: "Đã chấp nhận" },
              { key: "REJECTED", label: "Từ chối" },
            ].map((item) => {
              const isDisabled = selectedApp?.status === item.key;

              return (
                <Pressable
                  key={item.key}
                  disabled={isDisabled}
                  style={{
                    paddingVertical: 10,
                    opacity: isDisabled ? 0.4 : 1,
                  }}
                  onPress={() => updateStatus(item.key)}
                >
                  <Text>{item.label}</Text>
                </Pressable>
              );
            })}
            <Pressable
              onPress={() => setStatusModalVisible(false)}
              style={{ marginTop: 10 }}
            >
              <Text style={{ textAlign: "center", color: "#EF4444" }}>
                Đóng
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#F9FAFB",
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1.4,
    maxHeight: 40,
    minHeight: 40,
  },
  sortButton: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 8,
    marginLeft: 4,
    marginBottom: 9,
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
