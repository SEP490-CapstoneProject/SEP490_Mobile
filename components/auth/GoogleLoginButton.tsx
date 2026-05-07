import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import { Image, Pressable, Text } from "react-native";

GoogleSignin.configure({
  webClientId:
    "651997660040-n8d4fna1h6cj13cjemfhmjcr8h7uujfb.apps.googleusercontent.com",
});

export default function GoogleLoginButton() {
  useEffect(() => {
    const init = async () => {
      await GoogleSignin.hasPlayServices();
    };

    init();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();

      console.log("GOOGLE USER:", userInfo.data?.user);
    } catch (error) {
      console.log("GOOGLE LOGIN ERROR:", error);
    }
  };

  return (
    <Pressable
      onPress={handleGoogleLogin}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 7,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#ddd",
      }}
    >
      <Image
        source={require("../../assets/myApp/google.png")}
        style={{
          width: 30,
          height: 30,
          marginRight: 10,
        }}
      />

      <Text style={{ fontWeight: "600" }}>Đăng nhập với Google</Text>
    </Pressable>
  );
}
