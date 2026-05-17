import { useConfirm } from "@/components/ConfirmContext";
import { getRoomStatus, updateConnectionStatus } from "@/services/chat.api";
import { getAuth } from "@/services/storage";
import { showError, showSuccess } from "@/utils/toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Detail() {
  const router = useRouter();
  const { roomId, name, avatar, coverImage, role } = useLocalSearchParams<{
    roomId: string;
    name?: string;
    avatar?: string;
    coverImage?: string;
    role?: "COMPANY" | "USER";
  }>();
  const [status, setStatus] = useState<any>();
  const [userId, setUserId] = useState<number | null>(null);
  const { showConfirm } = useConfirm();

  useEffect(() => {
    const loadAuth = async () => {
      const data = await getAuth();
      setUserId(data?.id);
    };
    const loadStatus = async () => {
      const status = await getRoomStatus(Number(roomId));
      setStatus(status);
    };
    loadAuth();
    loadStatus();
  }, [roomId]);

  const handleToggleBlock = async () => {
    try {
      if (!status) return;

      let newStatus = status.status;

      if (status.status === "BLOCK") {
        await updateConnectionStatus(Number(roomId), "MATCHED");
        newStatus = "MATCHED";
      } else if (status.status === "MATCHED") {
        await updateConnectionStatus(Number(roomId), "BLOCK");
        newStatus = "BLOCK";
      }

      setStatus((prev: any) => ({
        ...prev,
        status: newStatus,
        blockId: newStatus === "BLOCK" ? userId : null,
      }));
    } catch (err) {
      console.log(err);
      showError("Lỗi", "Không thể thay đổi trạng thái");
    }
  };

  const handleDeleteConversation = async () => {
    try {
      showConfirm({
        title: "Xóa bài đăng",
        message: "Bạn có chắc muốn xóa không?",
        onConfirm: async () => {
          await updateConnectionStatus(Number(roomId), "STORED");
          showSuccess("Thành công", "Bạn đã xóa trò chuyện thành công");
          router.push("/chat");
        },
      });
    } catch (err) {
      console.log(err);
      showError("Lỗi", "Không thể xóa cuộc trò chuyện");
    }
  };

  return (
    <View style={styles.container}>
      {/** header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: `/(tabs)/chat/room`,
                params: {
                  roomId: roomId,
                  name: name,
                  avatar: avatar,
                  coverImage: coverImage,
                  role: role,
                },
              } as any)
            }
          >
            <Image
              source={require("../../../assets/myApp/arrow.png")}
              style={styles.headerIcon}
            />
          </Pressable>
          <Text style={styles.title}>Chi tiết</Text>
        </View>
      </View>
      {/** body */}
      <View style={styles.bodyContainer}>
        <View style={styles.bodyUser}>
          <Image
            source={
              coverImage
                ? { uri: coverImage }
                : require("../../../assets/myApp/app.png")
            }
            style={styles.coverImage}
          />
          <View style={{ top: -40, alignItems: "center" }}>
            <View>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              {role === "COMPANY" && (
                <Image
                  source={require("../../../assets/myApp/checklist.png")}
                  style={styles.iconCheckLish}
                />
              )}
            </View>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
        <View style={styles.bntContainer}>
          <Pressable style={styles.bntBodyFirst}>
            <View style={styles.bntLeft}>
              <Image
                source={require("../../../assets/myApp/profile1.png")}
                style={styles.iconFirst}
              />
              <Text style={styles.bntText}>Xem trang cá nhân</Text>
            </View>
            <Image
              source={require("../../../assets/myApp/forward.png")}
              style={styles.iconSecond}
            />
          </Pressable>
          <Pressable style={styles.bntBodySecond}>
            <View style={styles.bntLeft}>
              <Image
                source={require("../../../assets/myApp/search1.png")}
                style={styles.iconFirst}
              />
              <Text style={styles.bntText}>Tìm kiếm trong cuộc trò chuyện</Text>
            </View>
            <Image
              source={require("../../../assets/myApp/forward.png")}
              style={styles.iconSecond}
            />
          </Pressable>

          <Pressable
            style={styles.bntBodyFirst}
            onPress={handleToggleBlock}
            disabled={status?.status === "BLOCK" && status?.blockId !== userId}
          >
            <View style={styles.bntLeft}>
              <Image
                source={require("../../../assets/myApp/block.png")}
                style={styles.iconSecondLeft}
              />

              <Text style={styles.bntTextSecond}>
                {status?.status === "BLOCK"
                  ? status.blockId === userId
                    ? "Bỏ chặn cuộc trò chuyện"
                    : "Bạn đã bị chặn"
                  : "Chặn cuộc trò chuyện"}
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.bntBodySecond}
            onPress={handleDeleteConversation}
          >
            <View style={styles.bntLeft}>
              <Image
                source={require("../../../assets/myApp/trash.png")}
                style={styles.iconSecondLeft}
              />
              <Text style={styles.bntTextSecond}>Xóa trò chuyện</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    gap: 20,
    alignItems: "center",
  },
  headerIcon: {
    width: 23,
    height: 23,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bodyContainer: {
    flex: 1,
  },
  bodyUser: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    paddingBottom: 10,
  },
  coverImage: {
    width: "90%",
    height: 190,
    borderRadius: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  iconCheckLish: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 8,
    bottom: 0,
  },
  iconFirst: {
    width: 30,
    height: 30,
    tintColor: "#3B82F6",
  },
  iconSecond: {
    width: 20,
    height: 20,
  },
  bntBodyFirst: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: "90%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 15,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 0.5,
    marginTop: 20,
    alignItems: "center",
  },
  bntBodySecond: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: "90%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 15,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderTopColor: "#E2E8F0",
    borderTopWidth: 0.5,
    alignItems: "center",
  },
  bntContainer: {
    flex: 1,
    alignItems: "center",
  },
  bntLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  bntText: {
    fontSize: 16,
  },
  iconSecondLeft: {
    width: 25,
    height: 25,
  },
  bntTextSecond: {
    fontSize: 16,
    color: "#FF4848",
  },
});
