import { getAuth, getToken } from "@/services/auth.api";
import { fetchMessagesByRoom } from "@/services/chat.api";
import { chatRealtimeService } from "@/services/chatRealtimeService";
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
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const { roomId, name, avatar, coverImage, role } = useLocalSearchParams<{
    roomId: string;
    name?: string;
    avatar?: string;
    coverImage?: string;
    role?: "COMPANY" | "USER";
  }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const lastMyMessage = messages.find((m) => m.userId === userId);

  useEffect(() => {
    const init = async () => {
      const token = await getToken();

      chatRealtimeService.initConnection(token as string);
      await chatRealtimeService.start();

      await chatRealtimeService.joinRoom(Number(roomId));
    };

    init();

    return () => {
      chatRealtimeService.leaveRoom(Number(roomId));
    };
  }, [roomId]);

  useEffect(() => {
    const handleReceiveMessage = (msg: any) => {
      setMessages((prev) => [msg, ...prev]);
    };

    chatRealtimeService.onReceiveMessage(handleReceiveMessage);

    return () => {
      chatRealtimeService.offReceiveMessage(handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    const loadAuth = async () => {
      const data = await getAuth();
      setUserId(data?.id);
    };
    const loadMessages = async () => {
      const roomIdNumber = Number(roomId);
      if (!roomIdNumber) return;

      const data = await fetchMessagesByRoom(roomIdNumber);

      setMessages(Array.isArray(data) ? data : []);
    };

    loadAuth();
    loadMessages();
  }, [roomId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      await chatRealtimeService.sendMessage(Number(roomId), input);

      setInput("");
    } catch (err) {
      console.log("Send error:", err);
    }
  };

  const handleOut = async () => {
    await chatRealtimeService.leaveRoom(Number(roomId));
    router.back();
  };

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
            <Pressable onPress={handleOut}>
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
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isMyMessage = item.userId === userId;
            const isLastMyMessage = item.id === lastMyMessage?.id;
            return (
              <View>
                <View
                  style={[
                    styles.messageRow,
                    item.userId === userId
                      ? styles.contentContainerRight
                      : styles.contentContainerLeft,
                  ]}
                >
                  <View
                    style={[
                      styles.bubble,
                      item.userId === userId
                        ? styles.bubbleRight
                        : styles.bubbleLeft,
                    ]}
                  >
                    <Text
                      style={[
                        item.userId === userId
                          ? styles.contentRight
                          : styles.contentLeft,
                      ]}
                    >
                      {item.content}
                    </Text>
                    <Text
                      style={[
                        item.userId === userId
                          ? styles.timeRight
                          : styles.timeLeft,
                      ]}
                    >
                      {formatTimeAgo(item.createdAt)}
                    </Text>
                  </View>
                </View>
                {isMyMessage && isLastMyMessage && (
                  <Text style={styles.statusText}>
                    {item.status === "READ" ? " Đã xem" : "Đã gửi"}
                  </Text>
                )}
              </View>
            );
          }}
        />

        {/** footer */}
        <View style={styles.footerContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Tin nhắn ..."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={styles.textInput}
          />
          <Pressable style={styles.sendContainer} onPress={handleSend}>
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
    marginVertical: 5,
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
    fontSize: 11,
    color: "#6B7280",
  },
  timeRight: {
    alignSelf: "flex-end",
    fontSize: 11,
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
    marginTop: 20,
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
  statusText: {
    fontSize: 10,
    color: "#6B7280",
    alignSelf: "flex-end",
    marginRight: 12,
    marginTop: -5,
  },
});
