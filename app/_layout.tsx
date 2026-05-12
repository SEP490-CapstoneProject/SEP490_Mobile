import { ConfirmProvider } from "@/components/ConfirmContext";
import { LoadingProvider } from "@/components/LoadingContext";

import "@/services/notification/notification.config";
import { setupNotificationListeners } from "@/services/notification/notification.config";
import { realtimeService } from "@/services/realtimeService";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  useEffect(() => {
    setupNotificationListeners();
    const processed = new Set();

    const handler = async (msg: any) => {
      console.log("📩 RECEIVED:", msg);

      const key = msg.sentAt || msg.messageId;

      if (processed.has(key)) return;
      processed.add(key);

      if (processed.size > 100) processed.clear();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: msg.senderName || "Tin nhắn mới",
          body: msg.content,
        },
        trigger: null,
      });
    };

    realtimeService.onNewMessageNotification(handler);

    return () => {
      realtimeService.offNewMessageNotification(handler);
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
