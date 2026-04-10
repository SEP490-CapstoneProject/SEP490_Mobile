import {
  fetchNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/services/notification.api";
import { realtimeService } from "@/services/realtimeService";
import { formatTimeAgo } from "@/services/setTime";
import { useNotificationStore } from "@/utils/notificationStore";
import { Notification, showError } from "@/utils/toast";
import { router } from "expo-router";

import { useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CommunityNotification() {
  const {
    notifications,
    setNotifications,
    addNotification,
    markAllRead,
    markOneRead,
  } = useNotificationStore();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const load = async () => {
      const res = await fetchNotifications();
      setNotifications(res?.items || []);
    };

    load();
  }, []);

  useEffect(() => {
    const handler = (data: any) => {
      addNotification({
        id: data.notificationId,
        userId: data.userId,
        title: data.title,
        content: data.content,
        type: data.type,
        objectId: data.objectId,
        actor: {
          id: data.actorId,
          name: data.actorName,
          avatar: data.actorAvatar,
        },
        createdAt: data.createdAt,
        isRead: false,
      });

      Notification("Bạn có thông báo mới", data.content);
    };

    realtimeService.onNotification(handler);

    return () => realtimeService.offNotification(handler);
  }, []);

  const handlePress = async (item: any) => {
    try {
      await markNotificationAsRead(item.id);

      markOneRead(item.id);

      if (item.type === "POST_FAVORITE") {
        router.push({
          pathname: "/community/comment",
          params: {
            postId: Number(item.objectId),
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      markAllRead();
    } catch (err) {
      showError("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Bạn có <Text style={{ color: "red" }}>{unreadCount}</Text> thông báo
          chưa đọc
        </Text>

        <Pressable style={styles.btn} onPress={() => handleMarkAllRead()}>
          <Text style={{ color: "#fff", fontSize: 11 }}>
            Đánh dấu đọc tất cả
          </Text>
        </Pressable>
      </View>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              handlePress(item);
            }}
          >
            <View key={item.id} style={styles.card}>
              <Image
                source={{ uri: item.actor?.avatar }}
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.text}>
                  {item.actor?.name} {item.content}
                </Text>
                <Text style={styles.time}>{formatTimeAgo(item.createdAt)}</Text>
              </View>

              {!item.isRead && <View style={styles.dot} />}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  headerText: {
    fontSize: 14,
  },

  btn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 12,
    borderRadius: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  text: {
    fontSize: 15,
  },

  time: {
    fontSize: 12,
    color: "#6B7280",
    justifyContent: "flex-end",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563EB",
  },
});
