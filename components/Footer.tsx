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
    size: 24,
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
            <Image
              source={tab.icon}
              style={{
                width: tab.size,
                height: tab.size,
                tintColor: active ? "#3B82F6" : "#6B7280",
                marginBottom: 4,
              }}
            />
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
