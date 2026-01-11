import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { profileApi } from "../../../services/profile.api";

const arrowIcon = require("../../../assets/myApp/arrow.png");
const userIcon = require("../../../assets/myApp/user.png");
const pencilIcon = require("../../../assets/myApp/pencil.png");
const textIcon = require("../../../assets/myApp/text.png");
const mailIcon = require("../../../assets/myApp/mail.png");
const lockIcon = require("../../../assets/myApp/lock.png");
const smartphoneIcon = require("../../../assets/myApp/smartphone.png");

const COLORS = {
  background: "#E2E8F0",
  text: "#FF4848",
};

export default function EditProfile() {
  const router = useRouter();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    displayName: "An Nhiên",
    bio: "Developer Backend",
    email: "hihihaha@gmail.com",
    phone: "0123456789",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load profile data when component mounts
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await profileApi.getProfile();
        if (savedProfile) {
          setFormData({
            displayName: savedProfile.displayName,
            bio: savedProfile.bio,
            email: savedProfile.email,
            phone: savedProfile.phone,
          });
          // Load saved avatar if exists
          if (savedProfile.avatarUri) {
            setAvatarUri(savedProfile.avatarUri);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  }, []);

  const handleUploadAvatar = async () => {
    try {
      Alert.alert(
        "Chọn ảnh đại diện",
        "Chọn nguồn ảnh",
        [
          {
            text: "Thư viện ảnh",
            onPress: async () => {
              const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (permission.granted) {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 0.8,
                });

                if (!result.canceled && result.assets[0]) {
                  const selectedUri = result.assets[0].uri;
                  setAvatarUri(selectedUri);
                  Alert.alert("Thành công", "Ảnh đã được chọn thành công");
                }
              } else {
                Alert.alert("Cảnh báo", "Bạn cần cấp quyền truy cập thư viện ảnh");
              }
            },
            style: "default",
          },
          {
            text: "Chụp ảnh",
            onPress: async () => {
              const permission = await ImagePicker.requestCameraPermissionsAsync();
              if (permission.granted) {
                const result = await ImagePicker.launchCameraAsync({
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 0.8,
                });

                if (!result.canceled && result.assets[0]) {
                  const selectedUri = result.assets[0].uri;
                  setAvatarUri(selectedUri);
                  Alert.alert("Thành công", "Ảnh chụp đã được lưu");
                }
              } else {
                Alert.alert("Cảnh báo", "Bạn cần cấp quyền truy cập camera");
              }
            },
            style: "default",
          },
          {
            text: "Hủy",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải ảnh. Vui lòng thử lại");
      console.error("Error uploading avatar:", error);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Validate form
      if (!formData.displayName.trim()) {
        Alert.alert("Lỗi", "Tên hiển thị không được để trống");
        setIsLoading(false);
        return;
      }
      if (!formData.phone.trim()) {
        Alert.alert("Lỗi", "Số điện thoại không được để trống");
        setIsLoading(false);
        return;
      }

      // Save to AsyncStorage
      const profileData = {
        displayName: formData.displayName,
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
        avatarUri: avatarUri || undefined,
        lastUpdated: new Date().toISOString(),
      };

      // Save using profileApi service
      await profileApi.saveProfile(profileData);

      console.log("Saving profile data:", profileData);

      Alert.alert("Thành công", "Thông tin cá nhân đã được cập nhật");

      // Navigate back
      setTimeout(() => {
        setIsLoading(false);
        router.back();
      }, 500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Lỗi", "Không thể lưu thông tin. Vui lòng thử lại");
      console.error("Error saving profile:", error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={{
          paddingTop: 16,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: "#fff",
          marginTop: 36,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={arrowIcon}
            style={{ width: 20, height: 20, tintColor: "#000000" }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#000",
            marginLeft: 12,
            flex: 1,
          }}
        >
          Chỉnh sửa thông tin cá nhân
        </Text>
      </View>

      {/* Profile Image Section */}
      <View style={{ alignItems: "center", paddingVertical: 24 }}>
        <View
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
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              style={{ width: 100, height: 100 }}
              resizeMode="cover"
            />
          ) : (
            <MaterialCommunityIcons name="account" size={60} color="#fff" />
          )}
        </View>
        <TouchableOpacity
          onPress={handleUploadAvatar}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.text }}>
            Thay đổi ảnh
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {/* Display Name Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#333", marginBottom: 8 }}>
            Tên hiển thị
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.background,
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 48,
            }}
          >
            <Image
              source={userIcon}
              style={{ width: 20, height: 20, marginRight: 12, tintColor: "#666" }}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 14,
                color: "#000",
                paddingVertical: 0,
              }}
              placeholder="Nhập tên hiển thị"
              placeholderTextColor="#999"
              value={formData.displayName}
              onChangeText={(text) =>
                setFormData({ ...formData, displayName: text })
              }
            />
            <Image
              source={pencilIcon}
              style={{ width: 18, height: 18, marginLeft: 12}}
            />
          </View>
        </View>

        {/* Bio Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#333", marginBottom: 8 }}>
            Giới thiệu ngắn
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.background,
              borderRadius: 8,
              paddingHorizontal: 12,
              minHeight: 48,
              paddingVertical: 12,
            }}
          >
            <Image
              source={textIcon}
              style={{ width: 20, height: 20, marginRight: 12, tintColor: "#666", marginTop: -10 }}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 14,
                color: "#000",
                paddingVertical: 0,
              }}
              placeholder="Nhập giới thiệu ngắn"
              placeholderTextColor="#999"
              value={formData.bio}
              onChangeText={(text) =>
                setFormData({ ...formData, bio: text })
              }
              multiline
              numberOfLines={2}
            />
          </View>
        </View>

        {/* Email Input (Read-only) */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#333", marginBottom: 8 }}>
            Email
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.background,
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 48,
            }}
          >
            <Image
              source={mailIcon}
              style={{ width: 20, height: 20, marginRight: 12, tintColor: "#666" }}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 14,
                color: "#999",
                paddingVertical: 0,
              }}
              placeholder="Email"
              placeholderTextColor="#999"
              value={formData.email}
              editable={false}
            />
            <Image
              source={lockIcon}
              style={{ width: 18, height: 18, marginLeft: 12, tintColor: "#666" }}
            />
          </View>
        </View>

        {/* Phone Number Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#333", marginBottom: 8 }}>
            Số điện thoại
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.background,
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 48,
            }}
          >
            <Image
              source={smartphoneIcon}
              style={{ width: 20, height: 20, marginRight: 12, tintColor: "#666" }}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 14,
                color: "#000",
                paddingVertical: 0,
              }}
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#999"
              value={formData.phone}
              onChangeText={(text) =>
                setFormData({ ...formData, phone: text })
              }
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          style={{
            backgroundColor: COLORS.text,
            borderRadius: 8,
            paddingVertical: 14,
            paddingHorizontal: 20,
            alignItems: "center",
            marginTop: 24,
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
            {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
          </Text>
          
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
