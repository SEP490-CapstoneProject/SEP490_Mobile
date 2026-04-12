import { getAuth } from "@/services/auth.api";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Company from "./company";
import User from "./user";

export default function HomeIndex() {
  const [auth, setAuth] = useState<any>(null);
  const [tab, setTab] = useState<"explore" | "jobs">("explore");

  useEffect(() => {
    getAuth().then(setAuth);
  }, []);

  if (!auth) return null;

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER TAB */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 40 }}>
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
        </View>
        <Pressable onPress={() => console.log("Search pressed")}>
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
    color: "#000",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#000",
    paddingBottom: 4,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});
