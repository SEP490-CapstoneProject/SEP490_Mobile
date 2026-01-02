import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Image, Pressable, Text } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginButton() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "806009400835-3qemb016u36hrnu3sm4u57u8aufbmcmg.apps.googleusercontent.com",
    //     androidClientId:
    // "ANDROID_CLIENT_ID.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      console.log("Google Token:", response.authentication?.accessToken);
    }
  }, [response]);

  return (
    <Pressable
      disabled={!request}
      onPress={() => promptAsync()}
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
        style={{ width: 30, height: 30, marginRight: 10 }}
      />
      <Text style={{ fontWeight: "600" }}>Đăng nhập với Google</Text>
    </Pressable>
  );
}
