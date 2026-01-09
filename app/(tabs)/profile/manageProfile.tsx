import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const arrowIcon = require("../../../assets/myApp/arrow.png");
const edit1Icon = require("../../../assets/myApp/edit1.png");
const dotsIcon = require("../../../assets/myApp/dots.png");
const shareIcon = require("../../../assets/myApp/share2.png");
const viewIcon = require("../../../assets/myApp/show.png");
const editIcon = require("../../../assets/myApp/edit.png");
const trashIcon = require("../../../assets/myApp/trash.png");
const avatarIcon = require("../../../assets/myApp/avatar.png");

export default function ManageProfile() {
  const router = useRouter();
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "An Nhiên",
      title: "Nhà thiết kế UI/UX & Lập trình viên Frontend",
      description: "Một nhà thiết kế sản phẩm đầy nhiệt huyết với hơn 5 năm kinh nghiệm. Tôi tập trung vào việc tạo ra những trải nghiệm người dùng trực quan, đẹp mắt và giải quyết các vấn đề thiết kế lấy con người làm trung tâm",
    },
  ]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ paddingTop: 16, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: "#fff", marginTop: 36 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={arrowIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#000", flex: 1, marginLeft: 16 }}>
            Quản lý hồ sơ
          </Text>
          <TouchableOpacity>
            <Image
              source={edit1Icon}
              style={{ width: 22, height: 22, tintColor: "#3B82F6" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Container */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        {profiles.map((profile) => (
          <View
            key={profile.id}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              position: "relative",
            }}
          >
            {/* Dots Menu - Top Right with Label */}
            <View style={{ position: "absolute", top: 12, right: 12, flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View style={{ backgroundColor: "#DCFCE7", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                <Text style={{ fontSize: 11, fontWeight: "600", color: "#22c55e" }}>Đang dùng</Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 24,
                  height: 24,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={dotsIcon}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Profile Header - Avatar + Name + Job */}
            <View style={{ flexDirection: "row", marginBottom: 12 }}>
              {/* Avatar */}
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  overflow: "hidden",
                  marginRight: 16,
                  backgroundColor: "#f0f0f0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Image
                  source={avatarIcon}
                  style={{ width: 80, height: 80 }}
                  resizeMode="cover"
                />
              </View>

              {/* Name + Job Title */}
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                {/* Name */}
                <Text style={{ fontSize: 20, fontWeight: "700", color: "#000", marginBottom: 4 }}>
                  {profile.name}
                </Text>

                {/* Job Title */}
                <Text style={{ fontSize: 12, fontWeight: "600", color: "#3B82F6" }}>
                  {profile.title}
                </Text>
              </View>
            </View>

            {/* Description - Full Width */}
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 14, color: "#666", lineHeight: 16 }}>
                {profile.description}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={{ flexDirection: "row", gap: 6, marginTop: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
              {/* Share Button */}
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/profile/shareProfile")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: "#f5f5f5",
                  gap: 4,
                }}
              >
                <Image
                  source={shareIcon}
                  style={{ width: 14, height: 14 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 11, color: "#666", fontWeight: "500" }}>Chia sẻ</Text>
              </TouchableOpacity>

              {/* View Button */}
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/profile/viewPortfolio")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: "#f5f5f5",
                  gap: 4,
                }}
              >
                <Image
                  source={viewIcon}
                  style={{ width: 14, height: 14 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 11, color: "#666", fontWeight: "500" }}>Xem</Text>
              </TouchableOpacity>

              {/* Edit Button */}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: "#E1EEFF",
                  gap: 4,
                }}
              >
                <Image
                  source={editIcon}
                  style={{ width: 14, height: 14, tintColor: "#3B82F6" }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 11, color: "#3B82F6", fontWeight: "500" }}>Sửa</Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: "#FAD1D2",
                  gap: 4,
                }}
              >
                <Image
                  source={trashIcon}
                  style={{ width: 14, height: 14 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 11, color: "#dc2626", fontWeight: "500" }}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
