import { MessageRoomItem, fetchMessageRooms } from "@/services/chat.api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Chat() {
  const [messRoom, setMessRoom] = useState<MessageRoomItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchMessageRooms(1).then(setMessRoom);
  }, []);

  return (
    <View style={styles.container}>
      {/** header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Tin nhắn</Text>

        <Pressable style={styles.bntSearch}>
          <Image
            source={require("../../../assets/myApp/search1.png")}
            style={styles.iconSearch}
          />
        </Pressable>
      </View>
      {/** body */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/** room mess */}
        {messRoom.map((room) => (
          <Pressable
            style={styles.chat}
            key={room.roomId}
            onPress={() => {
              router.push({
                pathname: `/(tabs)/chat/room`,
                params: {
                  roomId: room.roomId,
                  name: room.name,
                  avatar: room.avatar,
                  role: room.role,
                },
              } as any);
            }}
          >
            <Image source={{ uri: room.avatar }} style={styles.avata} />
            {room.role === "COMPANY" && (
              <Image
                source={require("../../../assets/myApp/checklist.png")}
                style={styles.checkList}
              />
            )}
            <View style={styles.contentContainer}>
              <Text style={styles.name}>{room.name}</Text>
              <Text
                style={styles.content}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {room.lastContent}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bntSearch: {
    marginRight: 20,
  },
  iconSearch: {
    width: 27,
    height: 27,
  },
  bodyContainer: {},

  chat: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    borderTopColor: "#E2E8F0",
    borderTopWidth: 1,
    position: "relative",
  },
  avata: {
    width: 50,
    height: 50,
    borderRadius: 35,
    borderColor: "#E2E8F0",
    borderWidth: 1,
  },
  contentContainer: {
    paddingLeft: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
  },
  content: {
    fontSize: 15,
    color: "#6B7280",
    paddingLeft: 12,
    paddingTop: 3,
    paddingRight: 65,
  },
  checkList: {
    width: 15,
    height: 15,
    position: "absolute",
    bottom: 8,
    left: 43,
  },
});
