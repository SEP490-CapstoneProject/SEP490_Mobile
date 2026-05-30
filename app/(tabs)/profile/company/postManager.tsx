import CustomLoading from "@/components/CustomLoading";

import { fetchCompanyPostsByCompany } from "@/services/companyPost.api";
import { getAuth } from "@/services/storage";
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

export default function PostManager() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const auth = await getAuth();
      if (!auth?.companyId) return;

      const res = await fetchCompanyPostsByCompany(
        auth.companyId,
        undefined,
        10,
      );

      if (res) {
        setPosts(res.items);
        setLoading(false);
      }
    };

    loadData();
    setLoading(false);
  }, []);

  const loadMore = async () => {
    const auth = await getAuth();

    if (!auth?.companyId) return;
    const res = await fetchCompanyPostsByCompany(
      auth?.companyId,
      nextCursor,
      10,
    );

    if (res) {
      setPosts((prev) => [...prev, ...res.items]);
      setNextCursor(res.nextCursor);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.left}>
          <Pressable onPress={() => router.push("/(tabs)/profile/company")}>
            <Image
              source={require("../../../../assets/myApp/arrow.png")}
              style={styles.headerIcon}
            />
          </Pressable>
          <Text style={styles.title}>Quản lý tuyển dụng</Text>
        </View>
        <Pressable
          onPress={() => router.push("/(tabs)/profile/company/postCreate")}
        >
          <Image
            source={require("../../../../assets/myApp/edit1.png")}
            style={styles.headerIconCreate}
          />
        </Pressable>
      </View>
      {/* CONTENT */}
      {loading ? (
        <CustomLoading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
          }}
          onMomentumScrollEnd={loadMore}
        >
          {!posts || posts.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Bạn Chưa có bài đăng tuyển dụng nào!
              </Text>
              <Pressable
                onPress={() =>
                  router.push("/(tabs)/profile/company/postCreate")
                }
              >
                <Text style={{ fontSize: 15, color: "#3B82F6" }}>
                  Tạo bài đăng
                </Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.bodyContainer}>
              {posts.map((post) => (
                <Pressable
                  key={post.postId}
                  style={styles.card}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/profile/company/postView",
                      params: { postId: String(post.postId) },
                    })
                  }
                >
                  {post.mediaType === "image" ? (
                    <Image
                      source={
                        post?.mediaUrl?.trim()
                          ? { uri: post.mediaUrl }
                          : require("../../../../assets/myApp/Logo.png")
                      }
                      style={styles.media}
                    />
                  ) : (
                    <></>
                  )}
                  <View style={styles.overlay} />
                  <Text style={styles.titleCart}>{post.position}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
      )}
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
  headerIconCreate: {
    width: 23,
    height: 23,
    tintColor: "#3B82F6",
  },
  bodyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "49%",
    aspectRatio: 1,
    borderRadius: 14,
    marginBottom: 10,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },

  media: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  titleCart: {
    position: "absolute",
    bottom: 10,
    left: 8,
    right: 12,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
