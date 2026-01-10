import {
    NotificationDetail,
    fetchNotificationDetail,
} from "@/services/chat.api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Notification() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [detail, setDetail] = useState<NotificationDetail>();

  useEffect(() => {
    fetchNotificationDetail(Number(id)).then(setDetail);
  }, [id]);
  return (
    <View style={styles.container}>
      {/** header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../../../assets/myApp/arrow.png")}
              style={styles.headerIcon}
            />
          </Pressable>
          <Text style={styles.name}>SkillSnap</Text>
        </View>
        <Image
          source={require("../../../assets/myApp/list.png")}
          style={styles.headerIcon}
        />
      </View>
      {/** body */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 45,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 15,
  },
  headerIcon: {
    width: 23,
    height: 23,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
