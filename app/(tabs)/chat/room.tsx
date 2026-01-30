import { fetchMessagesByRoom, MessageItem } from "@/services/chat.api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { formatTimeAgo } from "../../../services/setTime";

export default function ChatRoom() {
  const USER_ID = 1;
  const router = useRouter();
  const { roomId, name, avatar, coverImage, role } = useLocalSearchParams<{
    roomId: string;
    name?: string;
    avatar?: string;
    coverImage?: string;
    role?: "COMPANY" | "USER";
  }>();
  const [messages, setMessages] = useState<MessageItem[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const id = Number(roomId);
    if (Number.isNaN(id)) return;

    fetchMessagesByRoom(id).then(setMessages);
  }, [roomId]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
    >
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
            <Text style={styles.name}>{name}</Text>
          </View>
          <Pressable
            onPress={() => {
              router.push({
                pathname: `/(tabs)/chat/detail`,
                params: {
                  roomId: roomId,
                  name: name,
                  avatar: avatar,
                  coverImage: coverImage,
                  role: role,
                },
              });
            }}
          >
            <Image
              source={require("../../../assets/myApp/list.png")}
              style={styles.headerIcon}
            />
          </Pressable>
        </View>
        {/** body */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          inverted
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageRow,
                item.userId === USER_ID
                  ? styles.contentContainerRight
                  : styles.contentContainerLeft,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  item.userId === USER_ID
                    ? styles.bubbleRight
                    : styles.bubbleLeft,
                ]}
              >
                <Text
                  style={[
                    item.userId === USER_ID
                      ? styles.contentRight
                      : styles.contentLeft,
                  ]}
                >
                  {item.content}
                </Text>
                <Text
                  style={[
                    item.userId === USER_ID
                      ? styles.timeRight
                      : styles.timeLeft,
                  ]}
                >
                  {formatTimeAgo(item.createdAt)}
                </Text>
              </View>
            </View>
          )}
        />

        {/** footer */}
        <View style={styles.footerContainer}>
          <TextInput
            placeholder="Tin nhắn ..."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={styles.textInput}
          />
          <Pressable style={styles.sendContainer}>
            <Image
              source={require("../../../assets/myApp/send.png")}
              style={styles.send}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  messageRow: {
    flexDirection: "row",
    marginVertical: 8,
    width: "100%",
  },
  contentContainerLeft: {
    justifyContent: "flex-start",
  },
  contentContainerRight: {
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 9,
  },

  bubbleLeft: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderWidth: 1,
    marginLeft: 10,
  },

  bubbleRight: {
    backgroundColor: "#3B82F6",
    marginRight: 10,
  },
  contentLeft: {
    color: "#000000",
    fontSize: 15,
  },
  contentRight: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  timeLeft: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#6B7280",
  },
  timeRight: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#FFFFFF",
  },
  footerContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderBottomColor: "#E2E8F0",
    borderTopColor: "#E2E8F0",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    width: 250,
    borderColor: "#E2E8F0",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 15.5,
  },
  sendContainer: {
    backgroundColor: "#3B82F6",
    width: 43,
    height: 43,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  send: {
    width: 23,
    height: 23,
  },
});
