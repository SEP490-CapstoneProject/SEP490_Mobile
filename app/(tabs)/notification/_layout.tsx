import { Slot, usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NotificationLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const isSystem = pathname.includes("system");
  const isCommunity = pathname.includes("community");

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Text style={styles.name}>Thông báo</Text>

        <Pressable style={styles.bntHeader}>
          <Text>Đánh dấu tất cả</Text>
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
        </Pressable>

        <Pressable
          style={[styles.tab, isCommunity && styles.activeTab]}
          onPress={() => router.replace("/(tabs)/notification/community")}
        >
          <Text style={isCommunity ? styles.activeText : styles.text}>
            Cộng đồng
          </Text>
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
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 15,
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
});
