import CustomLoading from "@/components/CustomLoading";
import { updateConnectionStatus } from "@/services/chat.api";
import {
  fetchLoadSystemNotifications,
  fetchSystemNotifications,
  markNotificationAsRead,
} from "@/services/notification.api";
import { formatTimeAgo } from "@/services/setTime";
import { useNotificationStore } from "@/utils/notificationStore";
import { showError, showSuccess } from "@/utils/toast";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function SystemNotification() {
  const router = useRouter();
  const { systemNotifications } = useNotificationStore();

  const [cursor, setCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const res = await fetchLoadSystemNotifications(20);

      useNotificationStore.getState().setSystemNotifications(res?.items || []);

      setCursor(res?.nextCursor || null);

      setLoading(false);
    };

    load();
  }, []);

  const loadMore = async () => {
    if (!cursor) return;

    const res = await fetchSystemNotifications(
      useNotificationStore.getState().systemNotifications.length,
      20,
    );

    const current = useNotificationStore.getState().systemNotifications;

    const map = new Map<number, any>();

    [...current, ...(res?.items || [])].forEach((item) => {
      map.set(item.id, item);
    });

    useNotificationStore
      .getState()
      .setSystemNotifications(
        Array.from(map.values()).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );

    setCursor(res?.nextCursor || null);
  };

  const handleAccept = async (item: any) => {
    try {
      const res = await updateConnectionStatus(item.objectId, "MATCHED");

      if (res) {
        showSuccess("Thành công", "Bạn đã chấp nhận lời mời kết nối");
      } else {
        showError("Thất bại", "Có lỗi xảy ra");
      }
    } catch (err) {
      showError("Lỗi", "Không thể kết nối");
    }
  };

  const handleReject = async (item: any) => {
    try {
      const res = await updateConnectionStatus(item.objectId, "STORED");

      if (res) {
        showSuccess("Thành công", "Bạn đã từ chối lời mời kết nối");
      } else {
        showError("Thất bại", "Có lỗi xảy ra");
      }
    } catch (err) {
      showError("Lỗi", "Không thể kết nối");
    }
  };

  const handleRead = async (id: number) => {
    await markNotificationAsRead(id);
    useNotificationStore.getState().markOneRead(id);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <CustomLoading />
      ) : (
        <FlatList
          data={systemNotifications}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                handleRead(item.id);
              }}
            >
              <View style={styles.notificationItem}>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.content}>{item.content}</Text>

                {item.type === "CONNECTION_REQUEST_ACCEPTED" && (
                  <>
                    {item.actor && (
                      <View style={styles.companyContainer}>
                        <Image
                          source={
                            item.actor?.avatar
                              ? { uri: item.actor.avatar }
                              : require("@/assets/myApp/Logo.png")
                          }
                          style={styles.avatar}
                        />
                        <>
                          {item.actor.Role === "COMPANY" && (
                            <Image
                              source={require("../../../assets/myApp/checklist.png")}
                              style={styles.avataIcon}
                            />
                          )}
                        </>
                        <Text style={styles.nameCompany}>
                          {item.actor.name}
                        </Text>
                      </View>
                    )}

                    <Pressable
                      style={styles.bntBody}
                      onPress={() =>
                        router.push({
                          pathname: "/(tabs)/chat/room",
                          params: {
                            roomId: item.objectId,
                            name: item.actor?.name,
                            avatar: item.actor?.avatar,
                            role: item.actor?.Role,
                          },
                        } as any)
                      }
                    >
                      <Text style={styles.bntText}>Bắt đầu trò chuyện</Text>
                    </Pressable>
                  </>
                )}

                {item.type === "CONNECTION_REQUEST_SENT" && (
                  <>
                    {item.actor && (
                      <View style={styles.companyContainer}>
                        <Image
                          source={
                            item.actor?.avatar
                              ? { uri: item.actor.avatar }
                              : require("@/assets/myApp/Logo.png")
                          }
                          style={styles.avatar}
                        />
                        <>
                          {item.actor.Role === "COMPANY" && (
                            <Image
                              source={require("../../../assets/myApp/checklist.png")}
                              style={styles.avataIcon}
                            />
                          )}
                        </>

                        <Text style={styles.nameCompany}>
                          {item.actor.name}
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        justifyContent: "center",
                      }}
                    >
                      <Pressable
                        style={styles.bntBody}
                        onPress={() => handleAccept(item)}
                      >
                        <Text style={[styles.bntText, { color: "#3B82F6" }]}>
                          Đồng ý
                        </Text>
                      </Pressable>

                      <Pressable
                        style={styles.bntBody}
                        onPress={() => handleReject(item)}
                      >
                        <Text style={[styles.bntText, { color: "#EF4444" }]}>
                          Từ chối
                        </Text>
                      </Pressable>
                    </View>
                  </>
                )}

                {item.type === "JOB_INVITATION" && (
                  <Pressable
                    style={styles.bntBody}
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/home/detail",
                        params: { postId: item.objectId },
                      })
                    }
                  >
                    <Text style={styles.bntText}>Xem công việc</Text>
                  </Pressable>
                )}

                {item.type === "PORTFOLIO_APPROVED" && (
                  <Pressable
                    style={styles.bntBody}
                    onPress={() =>
                      router.push({
                        pathname: `/(tabs)/profile/viewPortfolio`,
                        params: { portId: item.objectId },
                      })
                    }
                  >
                    <Text style={styles.bntText}>Xem hồ sơ</Text>
                  </Pressable>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 10,
                  }}
                >
                  <Text style={styles.time}>
                    {formatTimeAgo(item.createdAt)}
                  </Text>
                  {!item.isRead && <View style={styles.dot} />}
                </View>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 17,
  },

  content: {
    color: "#475569",
    fontSize: 14.5,
  },

  time: {
    fontSize: 12,
    color: "#94A3B8",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  companyContainer: {
    alignSelf: "center",
    marginVertical: 15,
    flexDirection: "row",
    position: "relative",
    gap: 10,
    alignItems: "center",
  },
  avataIcon: {
    width: 13,
    height: 13,
    position: "absolute",
    bottom: 0,
    left: 35,
  },
  nameCompany: {
    fontSize: 15.5,
    fontWeight: "bold",
  },
  bntBody: {
    backgroundColor: "#EFF6FF",
    alignSelf: "center",
    paddingHorizontal: 40,
    paddingVertical: 7,
    borderRadius: 10,
    marginVertical: 10,
  },
  bntText: {
    fontSize: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563EB",
  },
});
