import { router } from "expo-router";

let pendingNotification: any = null;

export function setPendingNotification(data: any) {
  pendingNotification = data;
}

export function consumePendingNotification() {
  if (!pendingNotification) return;

  const data = pendingNotification;

  pendingNotification = null;

  console.log("NAVIGATE:", data);

  const type = data.notificationType;

  const postId = data.objectId;

  if (type === "COMMUNITY") {
    router.replace({
      pathname: "/(tabs)/community/comment",
      params: {
        postId: postId,
      },
    });

    return;
  }

  if (type === "CHAT") {
    router.replace({
      pathname: "/chat/room",
      params: {
        roomId: data.roomId,
      },
    });

    return;
  }
}
