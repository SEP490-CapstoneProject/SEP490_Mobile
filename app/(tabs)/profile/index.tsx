import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Import menu item icons
const communitypostIcon = require("../../../assets/myApp/communitypost.png");
const manageprofileIcon = require("../../../assets/myApp/manageprofile.png");
const postprofileIcon = require("../../../assets/myApp/postprofile.png");
const saveIcon = require("../../../assets/myApp/save.png");
const statisticsIcon = require("../../../assets/myApp/statistics.png");

const iconMap = {
  "postprofile.png": postprofileIcon,
  "manageprofile.png": manageprofileIcon,
  "statistics.png": statisticsIcon,
  "communitypost.png": communitypostIcon,
  "save.png": saveIcon,
};
export default function Profile() {
  // Test data
  const user = {
    name: "An Nhiên",
    bio: "Nhà thiết kế UX & Lập trình viên Frontend",
    description: "Một nhà thiết kế sản phẩm đầy nhiệt huyết với hơn 5 năm kinh nghiệm.",
  };

  const actionButtons = [
    { id: 1, label: "Thiết kế UI" },
    { id: 2, label: ".NET" },
    { id: 3, label: "React" },
    { id: 4, label: "Figma" },
  ];

  const menuItems = [
    { id: 1, label: "Đăng hồ sơ", icon: "postprofile.png" },
    { id: 2, label: "Quản lý hồ sơ", icon: "manageprofile.png" },
    { id: 3, label: "Dữ liệu hiệu suất", icon: "statistics.png" },
    { id: 4, label: "Bài đăng cộng đồng", icon: "communitypost.png" },
    { id: 5, label: "Quan tâm", icon: "save.png" },
  ];

  const focuses = [
    { id: 1, label: "Quan tâm" },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ paddingTop: 16, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: "#fff" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#000" }}>
            Cá nhân
          </Text>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <TouchableOpacity style={{ width: 24, height: 24, justifyContent: "center", alignItems: "center" }}>
              <Image
                source={require("../../../assets/myApp/share-.png")}
                style={{ width: 24, height: 24, tintColor: "#000000" }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../../assets/myApp/menu.png")}
                style={{ width: 22, height: 22, tintColor: "#000000" }}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Avatar & Name Section */}
      <View style={{ alignItems: "center", paddingVertical: 24, backgroundColor: "#fff" }}>
        {/* Avatar Button */}
        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: "hidden",
            marginBottom: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#7ec88e",
          }}
        >
          <MaterialCommunityIcons name="account" size={60} color="#fff" />
        </TouchableOpacity>

        {/* Name with Badge */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#000" }}>
            {user.name}
          </Text>
          <View style={{ marginLeft: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: "#e8e8e8" }} />
        </View>
      </View>

      {/* Hộ sơ Section */}
      <View style={{ marginBottom: 16 }}>
        {/* Header with Dividers */}
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginBottom: 16 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", marginHorizontal: 12 }}>
            Hồ sơ
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
        </View>

        {/* Profile Content Container */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ backgroundColor: "#ffffff", borderRadius: 8, padding: 16, flexDirection: "row", borderWidth: 1, borderColor: "#e0e0e0" }}>
            {/* Profile Avatar */}
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#7ec88e",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
                flexShrink: 0,
              }}
            >
              <MaterialCommunityIcons name="account" size={28} color="#fff" />
            </View>
            
            {/* Profile Info - Right Side */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", marginBottom: 4 }}>
                {user.name}
              </Text>
              <Text style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
                {user.bio}
              </Text>

              {/* Description */}
              <Text style={{ fontSize: 12, color: "#666", lineHeight: 16, marginBottom: 8 }}>
                {user.description}
              </Text>

              {/* Action Buttons */}
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {actionButtons.map((btn) => (
                  <TouchableOpacity
                    key={btn.id}
                    style={{
                      backgroundColor: "#ffffff",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: "#ddd",
                    }}
                  >
                    <Text style={{ fontSize: 11, color: "#333", fontWeight: "500" }}>
                      {btn.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Menu Items - 3+2 Grid */}
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        {/* Row 1: 3 items */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          {menuItems.slice(0, 3).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                flex: 1,
                backgroundColor: "#eff6ff",
                borderRadius: 8,
                paddingVertical: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={iconMap[item.icon]}
                style={{ width: 32, height: 32, marginBottom: 8 }}
              />
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#000", textAlign: "center" }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Row 2: 2 items */}
        <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
          {menuItems.slice(3, 5).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                flex: 1,
                backgroundColor: "#eff6ff",
                borderRadius: 8,
                paddingVertical: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={iconMap[item.icon]}
                style={{ width: 32, height: 32, marginBottom: 8 }}
              />
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#000", textAlign: "center" }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={{ flex: 1 }} />
        </View>
      </View>

      {/* Gói Premium Section */}
      <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: 8,
            paddingVertical: 16,
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#e8f0ff",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 20 }}>★</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000" }}>
                Gói Premium của tôi
              </Text>
              <Text style={{ fontSize: 12, color: "#0066ff", marginTop: 2 }}>
                Nâng cấp để mở khóa thêm các tính năng
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 18, color: "#ccc" }}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
