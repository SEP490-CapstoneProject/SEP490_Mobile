import { markAllNotificationsAsRead } from "@/services/notification.api";
import { useNotificationStore } from "@/utils/notificationStore";
import { showError } from "@/utils/toast";
import { Slot, usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NotificationLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    communityNotifications,
    markAllRead,
    markOneRead,
    systemNotifications,
  } = useNotificationStore();

  const isSystem = pathname.includes("system");
  const isCommunity = pathname.includes("community");
  const unreadCount = communityNotifications.filter((n) => !n.isRead).length;
  const systemUnreadCount = systemNotifications.filter((n) => !n.isRead).length;

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
      <View style={styles.headerContainer}>
        <Text style={styles.name}>Thông báo</Text>

        <Pressable style={styles.bntHeader} onPress={() => handleMarkAllRead()}>
          <Text style={{ color: "#fff", fontSize: 11 }}>
            Đánh dấu đọc tất cả
          </Text>
        </Pressable>
      </View>

      {/* TAB SWITCH */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, isSystem && styles.activeTab]}
          onPress={() => router.replace("/(tabs)/notification/system")}
        >
          <Text style={isSystem ? styles.activeText : styles.text}>
            Hệ thống
          </Text>
          {systemUnreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{systemUnreadCount}</Text>
            </View>
          )}
        </Pressable>

        <Pressable
          style={[styles.tab, isCommunity && styles.activeTab]}
          onPress={() => router.replace("/(tabs)/notification/community")}
        >
          <Text style={isCommunity ? styles.activeText : styles.text}>
            Cộng đồng
          </Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{unreadCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* BODY */}
      <Slot />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 45,
    paddingBottom: 12,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    backgroundColor: "#FFFFFF",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  bntHeader: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  tabContainer: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
  },

  tab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#3B82F6",
  },

  text: {
    color: "#1E293B",
    fontWeight: "600",
  },

  activeText: {
    color: "#3B82F6",
    fontWeight: "600",
  },

  unreadBadge: {
    backgroundColor: "red",
    borderRadius: 17,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },

  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
