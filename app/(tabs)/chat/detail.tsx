import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Detail() {
  const router = useRouter();
  const { roomId, name, avatar, role } = useLocalSearchParams<{
    roomId: string;
    name?: string;
    avatar?: string;
    role?: "COMPANY" | "USER";
  }>();
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
          <Text style={styles.title}>Chi tiết</Text>
        </View>
      </View>
      {/** body */}
      <View style={styles.bodyContainer}>
        <View style={styles.bodyUser}>
          <View>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <Image
              source={require("../../../assets/myApp/checklist.png")}
              style={styles.iconCheckLish}
            />
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.bntContainer}>
          <Pressable style={styles.bntBodyFirst}>
            <View style={styles.bntLeft}>
              <Image
                source={require("../../../assets/myApp/building.png")}
                style={styles.iconFirst}
              />
              <Text style={styles.bntText}>Xem trang công ty</Text>
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

          <Pressable style={styles.bntBodyFirst}>
            <View style={styles.bntLeft}>
              <Image
                source={require("../../../assets/myApp/block.png")}
                style={styles.iconSecondLeft}
              />
              <Text style={styles.bntTextSecond}>Chặn nhà tuyển dụng</Text>
            </View>
          </Pressable>
          <Pressable style={styles.bntBodySecond}>
            <View style={styles.bntLeft}>
              <Image
                source={require("../../../assets/myApp/trash.png")}
                style={styles.iconSecondLeft}
              />
              <Text style={styles.bntTextSecond}>Xóa lịch sử trò chuyện</Text>
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
    paddingBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    right: 5,
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
