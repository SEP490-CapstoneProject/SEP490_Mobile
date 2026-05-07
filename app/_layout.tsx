import { ConfirmProvider } from "@/components/ConfirmContext";
import { LoadingProvider } from "@/components/LoadingContext";

import { chatRealtimeService } from "@/services/chatRealtimeService";
import "@/services/notification/notification.config";
import { getToken } from "@/services/storage";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  useEffect(() => {
    const setup = async () => {
      const { status } = await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();

        console.log("Permission:", newStatus);
      }
    };

    setup();

    const init = async () => {
      const token = await getToken();
      chatRealtimeService.initConnection(token as string);
      await chatRealtimeService.start();
    };

    init();

    const processed = new Set();

    const handler = async (msg: any) => {
      console.log("📩 RECEIVED:", msg);

      const key = msg.lastAt;

      if (processed.has(key)) return;
      processed.add(key);

      if (processed.size > 100) processed.clear();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: msg.senderName || "Tin nhắn mới",
          body: msg.lastContent,
        },
        trigger: null,
      });
    };

    chatRealtimeService.onRoomUpdated(handler);

    return () => {
      chatRealtimeService.onRoomUpdated(handler);
    };
  }, []);
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
