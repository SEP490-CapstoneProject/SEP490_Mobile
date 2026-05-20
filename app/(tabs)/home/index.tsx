import { getAuth } from "@/services/storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ChallengeManagement from "./challenge/ChallengeManagement";
import ChallengeTalentScreen from "./challenge/ChallengeTalent";
import Company from "./company";
import User from "./user";

export default function HomeIndex() {
  const [auth, setAuth] = useState<any>(null);
  const [tab, setTab] = useState<"explore" | "jobs" | "challenge">("explore");
  const router = useRouter();

  useEffect(() => {
    getAuth().then(setAuth);
  }, []);

  const handleSearch = () => {
    if (tab === "explore") {
      router.push("/(tabs)/home/searchPort");
    } else if (tab === "jobs") {
      router.push("/(tabs)/home/searchJob");
    }
  };

  if (!auth) return null;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Pressable onPress={() => setTab("explore")}>
            <Text style={[styles.tab, tab === "explore" && styles.active]}>
              Khám phá
            </Text>
          </Pressable>

          {auth.role === 1 && (
            <Pressable onPress={() => setTab("jobs")}>
              <Text style={[styles.tab, tab === "jobs" && styles.active]}>
                Tìm việc
              </Text>
            </Pressable>
          )}

          <Pressable onPress={() => setTab("challenge")}>
            <Text style={[styles.tab, tab === "challenge" && styles.active]}>
              Thử thách
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={handleSearch}>
          <Image
            source={require("../../../assets/myApp/search1.png")}
            style={styles.searchIcon}
          />
        </Pressable>
      </View>

      {/* CONTENT */}
      <View style={{ flex: 1 }}>
        {tab === "explore" && <Company />}
        {tab === "jobs" && auth.role === 1 && <User />}
        {tab === "challenge" && auth.role === 1 && <ChallengeTalentScreen />}
        {tab === "challenge" && auth.role === 2 && <ChallengeManagement />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 40,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingBottom: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  tab: {
    fontSize: 16,
    color: "#6B7280",
  },
  active: {
    color: "#3B82F6",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#3B82F6",
    paddingBottom: 4,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});
