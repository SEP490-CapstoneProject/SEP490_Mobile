import {
    fetchUserNotifications,
    isOtherNotification,
    UserNotification,
} from "@/services/notification.api";

import { formatTimeAgo } from "@/services/setTime";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function SystemNotification() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  useEffect(() => {
    fetchUserNotifications(1).then((data) => {
      const systemNotifications = data.filter(isOtherNotification);
      setNotifications(systemNotifications);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/** body */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        inverted
        contentContainerStyle={{
          padding: 16,
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
            {item.company && (
              <View style={styles.companyContainer}>
                <Image
                  source={{ uri: item.company.avatar }}
                  style={styles.avatar}
                />
                <Image
                  source={require("../../../assets/myApp/checklist.png")}
                  style={styles.avataIcon}
                />
                <Text style={styles.nameCompany}>{item.company.name}</Text>
              </View>
            )}
            {item.type === "CONNECTION_ACCEPTED" && (
              <Pressable
                style={styles.bntBody}
                onPress={() => {
                  router.push({
                    pathname: `/(tabs)/chat/room`,
                    params: {
                      roomId: item.objectId,
                      name: item.company?.name,
                      avatar: item.company?.avatar,
                      role: item.company?.role,
                    },
                  } as any);
                }}
              >
                <Text style={styles.bntText}>Bắt đầu trò chuyện</Text>
              </Pressable>
            )}
            {item.type === "JOB_INVITATION" && (
              <Pressable
                style={styles.bntBody}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/home/detail",
                    params: { postId: item.objectId },
                  })
                }
              >
                <Text style={styles.bntText}>Xem công việc</Text>
              </Pressable>
            )}
            {item.type === "PORTFOLIO_APPROVED" && (
              <Pressable
                style={styles.bntBody}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/profile/viewPortfolio",
                    params: { postId: item.objectId },
                  })
                }
              >
                <Text style={styles.bntText}>Xem hồ sơ</Text>
              </Pressable>
            )}
            <Text style={styles.time}>{formatTimeAgo(item.createdAt)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 17,
  },

  content: {
    color: "#475569",
    fontSize: 14.5,
  },

  time: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 15,
    textAlign: "right",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  companyContainer: {
    alignSelf: "center",
    marginVertical: 15,
    flexDirection: "row",
    position: "relative",
    gap: 10,
    alignItems: "center",
  },
  avataIcon: {
    width: 13,
    height: 13,
    position: "absolute",
    bottom: 0,
    left: 35,
  },
  nameCompany: {
    fontSize: 15.5,
    fontWeight: "bold",
  },
  bntBody: {
    backgroundColor: "#EFF6FF",
    alignSelf: "center",
    paddingHorizontal: 40,
    paddingVertical: 7,
    borderRadius: 10,
    marginVertical: 10,
  },
  bntText: {
    fontSize: 15,
    color: "#3B82F6",
  },
});
