import {
  getAuth,
  getToken,
  isTokenExpired,
  refreshToken,
} from "@/services/auth.api";
import { chatRealtimeService } from "@/services/chatRealtimeService";
import {
  fetchCompanyProfile,
  fetchEmployeeProfile,
} from "@/services/profile.api";
import { realtimeService } from "@/services/realtimeService";
import { useNotificationStore } from "@/utils/notificationStore";
import { Notification } from "@/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const init = async () => {
      let token = await getToken();

      if (!token) {
        router.replace("/(auth)/login");
        return;
      }

      if (isTokenExpired(token)) {
        const newToken = await refreshToken();
        if (!newToken) {
          router.replace("/(auth)/login");
          return;
        }
        token = newToken;
      }

      realtimeService.initConnection(token as string);
      await realtimeService.start();
      chatRealtimeService.initConnection(token as string);
      await chatRealtimeService.start();

      const handler = (data: any) => {
        useNotificationStore.getState().addNotification({
          id: data.notificationId,
          userId: data.userId,
          title: data.title,
          content: data.content,
          type: data.type,
          objectId: data.objectId,
          actor: {
            id: data.actorId,
            name: data.actorName,
            avatar: data.actorAvatar,
          },
          createdAt: data.createdAt,
          isRead: false,
        });

        Notification("Thông báo mới", data.content);
      };

      realtimeService.onNotification(handler);

      const auth = await getAuth();
      let profile;
      if (auth?.role === 1) {
        profile = await fetchEmployeeProfile();
      } else {
        profile = await fetchCompanyProfile();
      }

      if (profile?.needSetup) {
        if (profile.role === 1) {
          router.replace("/setupProfileUser");
        } else if (profile.role === 2) {
          router.replace("/setupProfileCompany");
        }
        return;
      }

      router.replace("/(tabs)/home");
    };

    init();
  }, []);

  return null;
}
