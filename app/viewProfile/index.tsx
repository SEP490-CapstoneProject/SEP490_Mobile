import {
  fetchCompanyByUserId,
  fetchEmployeeByUserId,
} from "@/services/profile.api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Community from "./community";
import Portfolio from "./portfolio";
import Post from "./post";

export default function Index() {
  const { auth } = useLocalSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<"PROFILE" | "POST" | "COMMUNITY">();
  const [company, setCompany] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);

  const users = useMemo(() => {
    return auth ? JSON.parse(auth as string) : null;
  }, [auth]);

  useEffect(() => {
    if (!users) return;

    const load = async () => {
      try {
        if (users.role === "COMPANY") {
          const data = await fetchCompanyByUserId(users.id);
          setCompany(data);
          setTab("POST");
          setUserId(data.userId);
        } else if (users.role === "USER") {
          const data = await fetchEmployeeByUserId(users.id);
          setUser(data);
          setTab("PROFILE");
          setUserId(data.userId);
        }
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, [users]);

  return (
    <View style={styles.container}>
      {users.role === "COMPANY" ? (
        <View>
          <View>
            <Image
              source={{ uri: company?.coverImage }}
              style={styles.coverImage}
            />

            <Image source={{ uri: company?.avatar }} style={styles.avata} />
            <Image
              source={require("../../assets/myApp/checklist.png")}
              style={styles.avataIcon}
            />
            <View
              style={{
                marginLeft: 20,
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
              }}
            >
              <Text style={styles.name}>{company?.companyName}</Text>
            </View>
          </View>

          <View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                marginHorizontal: 15,
                marginBottom: 10,
              }}
            >
              <View style={styles.flex}>
                <Text style={{ fontWeight: "bold", fontSize: 15.5 }}>
                  Lĩnh vực:
                </Text>
                <Text style={styles.text}>{company?.activityField}</Text>
              </View>

              <View style={styles.flex}>
                <Image
                  source={require("../../assets/myApp/maps-and-flags1.png")}
                  style={{ width: 14, height: 14 }}
                />
                <Text style={styles.text}>{company?.address}</Text>
              </View>
            </View>

            <Text style={styles.description}>{company?.description}</Text>
          </View>
        </View>
      ) : (
        <View>
          <Image source={{ uri: user?.coverImage }} style={styles.coverImage} />
          <View style={{ position: "relative" }}>
            <Image source={{ uri: user?.avatar }} style={[styles.avata]} />
          </View>
          <View
            style={{
              marginLeft: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Text style={styles.name}>{user?.name}</Text>
          </View>
        </View>
      )}

      <View style={styles.tabs}>
        {users.role === "COMPANY" ? (
          <>
            <Pressable onPress={() => setTab("POST")}>
              <Text style={[styles.tab, tab === "POST" && styles.tabActive]}>
                Tuyển dụng
              </Text>
            </Pressable>

            <Pressable onPress={() => setTab("COMMUNITY")}>
              <Text
                style={[styles.tab, tab === "COMMUNITY" && styles.tabActive]}
              >
                Bài đăng cộng đồng
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={() => setTab("PROFILE")}>
              <Text style={[styles.tab, tab === "PROFILE" && styles.tabActive]}>
                Hồ sơ
              </Text>
            </Pressable>

            <Pressable onPress={() => setTab("COMMUNITY")}>
              <Text
                style={[styles.tab, tab === "COMMUNITY" && styles.tabActive]}
              >
                Bài đăng cộng đồng
              </Text>
            </Pressable>
          </>
        )}
      </View>
      {tab === "PROFILE" && user?.id ? (
        <Portfolio empId={user?.id} />
      ) : tab === "COMMUNITY" && userId ? (
        <Community userId={userId} />
      ) : tab === "POST" && company?.id ? (
        <Post comId={company.id} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  coverImage: {
    width: "100%",
    height: 190,
  },
  avata: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginTop: -40,
    marginLeft: 20,
  },
  name: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 0,
  },
  bntEdit: {
    backgroundColor: "#E5E7EB",
    width: 40,
    height: 18,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  iconEdit: {
    width: 14,
    height: 14,
    tintColor: "#000000",
  },
  description: {
    marginHorizontal: 15,
    fontSize: 15.5,
    lineHeight: 19.5,
  },
  text: {
    fontSize: 15.5,
    lineHeight: 19.5,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  premiumBnt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 30,
  },
  iconPremiumLeft: {
    backgroundColor: "#EFF6FF",
    padding: 10,
    borderRadius: 10,
  },
  textPremium: {
    fontSize: 16,
    fontWeight: "600",
  },
  textPremiumSub: {
    fontSize: 13,
    color: "#6B7280",
  },
  badge: {
    position: "absolute",
    top: -40,
    left: 90,
    backgroundColor: "#fff",
    borderRadius: 999,
    padding: 3,
    elevation: 4,
  },
  tabs: {
    flexDirection: "row",
    marginTop: 15,
    marginHorizontal: 20,
    gap: 25,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
  },

  tab: {
    fontSize: 15,
    color: "#6B7280",
    paddingBottom: 6,
  },

  tabActive: {
    color: "#2563EB",
    borderBottomWidth: 2,
    borderColor: "#2563EB",
  },
  avataIcon: {
    width: 17,
    height: 17,
    position: "relative",
    bottom: 17,
    left: 80,
  },
  iconContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 10,
    top: 30,
  },
  backgroundIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconRight: {
    right: 10,
    top: 10,
    flexDirection: "row",
    gap: 25,
  },
  iconLeft: {
    left: 10,
    top: 10,
  },
});
