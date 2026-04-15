import { ConfirmProvider } from "@/components/ConfirmContext";
import { LoadingProvider } from "@/components/LoadingContext";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <LoadingProvider>
      <ConfirmProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <Toast />
      </ConfirmProvider>
    </LoadingProvider>
  );
}
