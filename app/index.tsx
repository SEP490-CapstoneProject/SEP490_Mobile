import {
  getAuth,
  getToken,
  isTokenExpired,
  refreshToken,
} from "@/services/auth.api";
import { chatRealtimeService } from "@/services/chatRealtimeService";
import {
  fetchCommunityNotifications,
  fetchSystemNotifications,
} from "@/services/notification.api";
import {
  fetchCompanyProfile,
  fetchEmployeeProfile,
} from "@/services/profile.api";
import { realtimeService } from "@/services/realtimeService";
import { fetchMySubscription } from "@/services/subscription.api";
import { useNotificationStore } from "@/utils/notificationStore";
import { Notification } from "@/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    let isMounted = true;

    const processed = new Set<number>();
    const handler = (data: any) => {
      if (!isMounted) return;

      if (processed.has(data.notificationId)) return;
      processed.add(data.notificationId);

      if (processed.size > 100) processed.clear();

      const notification = {
        id: data.notificationId,
        userId: data.userId,
        title: data.title,
        content: data.content,
        type: data.type,
        objectId: data.objectId,
        actor: data.actorId
          ? {
              id: data.actorId,
              name: data.actorName,
              avatar: data.actorAvatar,
              Role: data.Role,
            }
          : undefined,
        createdAt: data.createdAt,
        isRead: false,
      };

      const isCommunity =
        data.category === "community" ||
        ["LIKE", "COMMENT", "REPLY"].includes(data.type);

      if (isCommunity) {
        useNotificationStore.getState().addCommunityNotification(notification);
      } else {
        useNotificationStore.getState().addSystemNotification(notification);
      }

      Notification(
        isCommunity ? "Hoạt động mới" : "Thông báo hệ thống",
        data.content,
      );
    };

    const init = async () => {
      let token = await getToken();

      if (token && isTokenExpired(token)) {
        token = await refreshToken();
      }

      if (!token) {
        router.replace("/(auth)/login");
        return;
      }

      const [systemRes, communityRes] = await Promise.all([
        fetchSystemNotifications(20),
        fetchCommunityNotifications(20),
      ]);

      const currentSystem = useNotificationStore.getState().systemNotifications;

      const systemMap = new Map<number, any>();

      [...currentSystem, ...(systemRes?.items || [])].forEach((item) => {
        systemMap.set(item.id, item);
      });

      useNotificationStore
        .getState()
        .setSystemNotifications(
          Array.from(systemMap.values()).sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );

      const currentCommunity =
        useNotificationStore.getState().communityNotifications;

      const communityMap = new Map<number, any>();

      [...(communityRes?.items || []), ...currentCommunity].forEach((item) => {
        communityMap.set(item.id, item);
      });

      useNotificationStore
        .getState()
        .setCommunityNotifications(
          Array.from(communityMap.values()).sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );

      realtimeService.initConnection(token);
      await realtimeService.start();

      chatRealtimeService.initConnection(token);
      await chatRealtimeService.start();

      realtimeService.onSystemNotification(handler);
      realtimeService.onCommunityNotification(handler);

      const auth = await getAuth();
      let profile;

      if (auth?.role === 1) {
        profile = await fetchEmployeeProfile();
      } else {
        profile = await fetchCompanyProfile();
      }

      if (profile?.needSetup) {
        router.replace(
          profile.role === 1 ? "/setupProfileUser" : "/setupProfileCompany",
        );
        return;
      }

      await fetchMySubscription();

      router.replace("/(tabs)/home");
    };

    init();
  }, []);

  return null;
}
