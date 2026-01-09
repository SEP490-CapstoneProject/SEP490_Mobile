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
      <View>
        <View>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../../../assets/myApp/arrow.png")}
              style={styles.headerIcon}
            />
          </Pressable>
          <Text style={styles.name}>SkillSnap</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  headerIcon: {
    width: 23,
    height: 23,
  },
  name:{
    fontSize: 17,
    fontWeight: "bold",
  }
});
