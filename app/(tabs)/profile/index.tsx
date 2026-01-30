import SidebarMenu from "@/components/menu/SidebarMenu";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cá nhân</Text>
        <Pressable onPress={() => setIsSidebarOpen(true)}>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../../assets/myApp/menu.png")}
          />
        </Pressable>
      </View>

      {/* Sidebar Menu */}
      <SidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={() => {
          setIsSidebarOpen(false);
          console.log("logout");
        }}
        onSupportCenter={() => {
          setIsSidebarOpen(false);
          console.log("support");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    paddingTop: 40,
  },
});
