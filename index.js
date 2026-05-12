import "expo-router/entry";

import { getApp } from "@react-native-firebase/app";

import {
  getMessaging,
  setBackgroundMessageHandler,
} from "@react-native-firebase/messaging";

const app = getApp();

const messaging = getMessaging(app);

setBackgroundMessageHandler(messaging, async (remoteMessage) => {
  console.log("BACKGROUND MESSAGE:", remoteMessage);
});
