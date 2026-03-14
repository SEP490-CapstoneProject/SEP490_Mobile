import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import CarePostScreen from "./CarePostScreen";
import CareProfileScreen from "./CareProfileScreen";

export default function index() {
  const router = useRouter();
  const [tab, setTab] = useState<"PROFILE" | "POST">("PROFILE");
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.left}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../../../../../assets/myApp/arrow.png")}
              style={styles.headerIcon}
            />
          </Pressable>
          <Text style={styles.title}>Quản lý tuyển dụng</Text>
        </View>
      </View>
      {/* TAB */}
      <View style={styles.tabContainer}>
        <Pressable onPress={() => setTab("PROFILE")}>
          <Text style={[styles.tabText, tab === "PROFILE" && styles.tabActive]}>
            Hồ sơ ứng viên
          </Text>
        </Pressable>

        <Pressable onPress={() => setTab("POST")}>
          <Text style={[styles.tabText, tab === "POST" && styles.tabActive]}>
            Bài đăng cộng đồng
          </Text>
        </Pressable>
      </View>
      <View style={{ marginHorizontal: 17, marginVertical: 6, gap: 5 }}>
        <Text style={{ fontSize: 19, fontWeight: "bold" }}>Mục quan tâm</Text>
        <Text style={{ fontSize: 14.5, color: "#6B7280" }}>
          Quản lý và theo dõi các hồ sơ, bài viết bạn đã quan tâm
        </Text>
      </View>
      {/* BODY */}
      {tab === "PROFILE" ? <CareProfileScreen /> : <CarePostScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 12,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingRight: 20,
  },

  headerIcon: { width: 23, height: 23 },
  title: { fontSize: 20, fontWeight: "bold" },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 20,
    borderBottomColor: "#F3F4F6",
    borderBottomWidth: 1.2,
    height: 30,
  },

  tabText: { fontSize: 15, color: "#6B7280" },

  tabActive: {
    color: "#2563EB",
    fontWeight: "600",
    borderBottomColor: "#2563EB",
    borderBottomWidth: 1.8,
    paddingBottom: 7,
  },
});
