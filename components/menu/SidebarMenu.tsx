import { Image, Pressable, ScrollView, Text, View } from "react-native";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
  onChangePassword?: () => void;
  onPrivacyCenter?: () => void;
  onSupportCenter?: () => void;
  onTermsPolicy?: () => void;
}

export default function SidebarMenu({
  isOpen,
  onClose,
  onLogout,
  onChangePassword,
  onPrivacyCenter,
  onSupportCenter,
  onTermsPolicy,
}: SidebarMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    {
      id: 1,
      label: "Trung tâm Hỗ trợ",
      icon: require("../../assets/myApp/customersupport.png"),
      onPress: onSupportCenter,
    },
    {
      id: 2,
      label: "Trung tâm Quyền riêng tư",
      icon: require("../../assets/myApp/lock.png"),
      onPress: onPrivacyCenter,
    },
    {
      id: 3,
      label: "Điều khoản & Chính sách",
      icon: require("../../assets/myApp/warning.png"),
      onPress: onTermsPolicy,
    },
    {
      id: 4,
      label: "Đổi mật khẩu",
      icon: require("../../assets/myApp/rotatelock.png"),
      onPress: onChangePassword,
    },
    {
      id: 5,
      label: "Đăng xuất",
      icon: require("../../assets/myApp/logout.png"),
      onPress: onLogout,
      isLogout: true,
    },
  ];

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row",
        zIndex: 1000,
      }}
    >
      {/* Overlay to close sidebar */}
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onPress={onClose}
      />

      {/* Sidebar */}
      <View
        style={{
          width: "70%",
          backgroundColor: "#ffffff",
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: 16,
          flexDirection: "column",
          borderRightWidth: 1,
          borderRightColor: "#e0e0e0",
        }}
      >
        {/* Logo */}
        <View
          style={{
            alignItems: "center",
            marginBottom: 24,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#f0f0f0",
          }}
        >
          <Image
            source={require("../../assets/myApp/Logo.png")}
            style={{
              width: 120,
              height: 80,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Menu Items */}
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 14,
                paddingHorizontal: 12,
                marginVertical: 4,
                borderRadius: 8,
                backgroundColor: item.isLogout ? "#fff5f5" : "#f9f9f9",
              }}
              onPress={() => {
                item.onPress?.();
                onClose();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Image
                  source={item.icon}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 12,
                    tintColor: item.isLogout ? "#FF4444" : "#666",
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: item.isLogout ? "600" : "500",
                    color: item.isLogout ? "#FF4444" : "#333",
                  }}
                >
                  {item.label}
                </Text>
              </View>
              <Image
                source={require("../../assets/myApp/forward.png")}
                style={{
                  width: 18,
                  height: 18,
                  tintColor: item.isLogout ? "#FF4444" : "#999",
                }}
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </ScrollView>

        {/* Version */}
        <View
          style={{
            alignItems: "center",
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#f0f0f0",
            marginTop: 16,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#999",
              fontWeight: "500",
            }}
          >
            SkillSnap Mobile V1.0.2
          </Text>
        </View>
      </View>
    </View>
  );
}
