import CustomLoading from "@/components/CustomLoading";
import {
  fetchCommunityNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/services/notification.api";
import { formatTimeAgo } from "@/services/setTime";
import { useNotificationStore } from "@/utils/notificationStore";
import { showError } from "@/utils/toast";
import { router } from "expo-router";

import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CommunityNotification() {
  const { communityNotifications, markAllRead, markOneRead } =
    useNotificationStore();
  const [loading, setLoading] = useState(false);

  const [cursor, setCursor] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const res = await fetchCommunityNotifications(20);

      useNotificationStore
        .getState()
        .setCommunityNotifications(res?.items || []);

      setCursor(res?.nextCursor || null);
      setLoading(false);
    };

    load();
  }, []);

  const loadMore = async () => {
    if (!cursor) return;

    const res = await fetchCommunityNotifications(20);

    const current = useNotificationStore.getState().communityNotifications;

    const map = new Map();

    [...current, ...(res?.items || [])].forEach((item) => {
      map.set(item.id, item);
    });

    useNotificationStore
      .getState()
      .setCommunityNotifications(Array.from(map.values()));

    setCursor(res?.nextCursor || null);
  };
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
      {loading ? (
        <CustomLoading />
      ) : (
        <View>
          {/* LIST */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={loadMore}
          >
            {communityNotifications.map((item) => (
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
                    <Text style={styles.time}>
                      {formatTimeAgo(item.createdAt)}
                    </Text>
                  </View>

                  {!item.isRead && <View style={styles.dot} />}
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
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
