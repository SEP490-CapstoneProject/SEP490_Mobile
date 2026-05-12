import { getApp } from "@react-native-firebase/app";
import {
  AuthorizationStatus,
  getToken as getFcmToken,
  getInitialNotification,
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
  requestPermission,
} from "@react-native-firebase/messaging";

import * as Notifications from "expo-notifications";
import { PermissionsAndroid, Platform } from "react-native";

import { getAuth, getToken } from "../storage";
import {
  consumePendingNotification,
  setPendingNotification,
} from "./notificationNavigation";

const app = getApp();
const messaging = getMessaging(app);

const API =
  "https://notification-service.redmushroom-1d023c6a.southeastasia.azurecontainerapps.io";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function requestNotificationPermission() {
  try {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

    const authStatus = await requestPermission(messaging);

    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    return enabled;
  } catch (err) {
    console.log("REQUEST PERMISSION ERROR:", err);
    return false;
  }
}

async function registerDeviceToken(fcmToken: string) {
  try {
    const authToken = await getToken();
    const auth = await getAuth();

    if (!authToken) return;

    const response = await fetch(`${API}/api/device-tokens/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        userId: auth?.id?.toString(),
        token: fcmToken,
        deviceType: Platform.OS,
        appVersion: "1.0.0",
      }),
    });
  } catch (err) {
    console.log("REGISTER TOKEN ERROR:", err);
  }
}

export async function setupNotifications() {
  try {
    // permission
    const granted = await requestNotificationPermission();

    if (!granted) {
      console.log("NOTIFICATION PERMISSION DENIED");
      return;
    }

    // get FCM token
    const fcmToken = await getFcmToken(messaging);

    console.log("FCM TOKEN:", fcmToken);

    // save token
    if (fcmToken) {
      await registerDeviceToken(fcmToken);
    }

    // token refresh
    onTokenRefresh(messaging, async (newToken) => {
      await registerDeviceToken(newToken);
    });
  } catch (err) {
    console.log("SETUP NOTIFICATION ERROR:", err);
  }
}

export async function setupNotificationListeners() {
  try {
    onMessage(messaging, async (remoteMessage) => {
      console.log("🔥 FCM FOREGROUND:", JSON.stringify(remoteMessage, null, 2));

      await Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification?.title || "Thông báo mới",

          body: remoteMessage.notification?.body || "",

          data: remoteMessage.data,
        },

        trigger: null,
      });
    });
    onNotificationOpenedApp(messaging, (remoteMessage) => {
      console.log(
        "📩 OPEN FROM BACKGROUND:",
        JSON.stringify(remoteMessage, null, 2),
      );
    });

    const initialNotification = await getInitialNotification(messaging);

    if (initialNotification) {
      console.log("OPEN FROM KILL APP", initialNotification);

      setPendingNotification(initialNotification.data);
      setTimeout(() => {
        consumePendingNotification();
      }, 2500);
    }
  } catch (err) {
    console.log("NOTIFICATION LISTENER ERROR:", err);
  }
}
