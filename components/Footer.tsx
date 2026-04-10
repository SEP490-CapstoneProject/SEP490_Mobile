import { useNotificationStore } from "@/utils/notificationStore";
import { usePathname, useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const tabs = [
  {
    label: "Trang chủ",
    path: "/home" as const,
    icon: require("../assets/myApp/home-1.png"),
    size: 29,
  },
  {
    label: "Cộng đồng",
    path: "/community" as const,
    icon: require("../assets/myApp/groupFooter.png"),
    size: 28,
  },
  {
    label: "Tin nhắn",
    path: "/chat" as const,
    icon: require("../assets/myApp/message.png"),
    size: 25,
  },
  {
    label: "Thông báo",
    path: "/notification" as const,
    icon: require("../assets/myApp/bell.png"),
    size: 23,
  },
  {
    label: "Cá nhân",
    path: "/profile" as const,
    icon: require("../assets/myApp/user.png"),
    size: 24,
  },
];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const notifications = useNotificationStore((s) => s.notifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View
      style={{
        flexDirection: "row",
        height: 110,
        paddingBottom: 40,
        backgroundColor: "#fff",
      }}
    >
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.path);

        return (
          <Pressable
            key={tab.path}
            onPress={() => router.replace(tab.path)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ position: "relative" }}>
              <Image
                source={tab.icon}
                style={{
                  width: tab.size,
                  height: tab.size,
                  tintColor: active ? "#3B82F6" : "#6B7280",
                  marginBottom: 4,
                }}
              />
              {tab.path === "/notification" && unreadCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -8,
                    backgroundColor: "red",
                    borderRadius: 10,
                    minWidth: 16,
                    height: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 3,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{
                fontSize: 12,
                color: active ? "#3B82F6" : "#6B7280",
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
