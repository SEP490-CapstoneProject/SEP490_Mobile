import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 20 }}>
        👤 Cá nhân
      </Text>

      <Button
        title="Logout (test)"
        onPress={() => router.replace("/(auth)/login")}
      />
    </View>
  );
}
