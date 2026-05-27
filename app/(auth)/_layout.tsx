import { router, Slot, usePathname } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
// import GoogleLoginButton from "../../components/auth/GoogleLoginButton";

export default function AuthLayout() {
  const pathname = usePathname();

  const isLogin = pathname.startsWith("/login");
  const isRegister = pathname.startsWith("/register");

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("../../assets/myApp/Logo.png")}
        style={{ width: 150, height: 150, alignSelf: "center" }}
      />

      {/* TAB SWITCH */}
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <Pressable
          onPress={() => router.push("/login")}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: isLogin ? "#1e90ff" : "#ddd",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: isLogin ? "#1e90ff" : "#999",
              fontWeight: "600",
            }}
          >
            Đăng nhập
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/register")}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: isRegister ? "#1e90ff" : "#ddd",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: isRegister ? "#1e90ff" : "#999",
              fontWeight: "600",
            }}
          >
            Đăng ký
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1, marginBottom: 30 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Slot />
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 32,
            marginBottom: 20,
          }}
        >
          <View
            style={{ height: 1, backgroundColor: "#CBD5E1", width: "28%" }}
          ></View>
          <Text style={{ fontSize: 13, color: "#94A3B8", fontWeight: "500" }}>
            Hoặc đăng nhập với
          </Text>
          <View
            style={{ height: 1, backgroundColor: "#CBD5E1", width: "28%" }}
          ></View>
        </View>
        <GoogleLoginButton /> */}
      </ScrollView>
    </View>
  );
}
