import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostProfile() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState(["Design", "Thiết kế UI", "Figma", "Tạo mẫu", "Nhiếp ảnh"]);
  const [attachments, setAttachments] = useState([]);

  const handleAddSkill = () => {
    Alert.alert("Thêm kỹ năng", "Nhập kỹ năng mới", [
      {
        text: "Hủy",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          // TODO: Implement skill input
        },
      },
    ]);
  };

  const handleAddAttachment = () => {
    // TODO: Implement file picker for attachments
    console.log("Add attachment");
  };

  const handleUploadMedia = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          console.log("Media selected:", result.assets[0]);
        }
      } else {
        Alert.alert("Cảnh báo", "Bạn cần cấp quyền truy cập thư viện ảnh");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể chọn ảnh/video");
      console.log(error);
    }
  };

  const handlePostProfile = () => {
    if (!title.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tiêu đề");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mô tả ngắn");
      return;
    }
    // TODO: Implement post profile logic
    console.log("Posting profile with:", { title, description, skills, attachments });
    Alert.alert("Thành công", "Hồ sơ của bạn đã được đăng");
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            marginTop: 36,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require("../../../assets/myApp/arrow.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#000",
              marginLeft: 16,
            }}
          >
            Đăng hồ sơ
          </Text>
        </View>

        {/* Upload Media Section */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <TouchableOpacity
            onPress={handleUploadMedia}
            style={{
              backgroundColor: "#e0ebff",
              borderWidth: 2,
              borderColor: "#b0d4ff",
              borderStyle: "dashed",
              borderRadius: 12,
              paddingVertical: 40,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../../assets/myApp/upload.png")}
              style={{ width: 40, height: 40, marginBottom: 12 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#000",
                marginBottom: 8,
              }}
            >
              Chạm để tải lên
            </Text>
            <Text style={{ fontSize: 13, color: "#666", textAlign: "center" }}>
              Video giới thiệu bản thân, ảnh bản thân
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#000",
              marginBottom: 8,
            }}
          >
            Tiêu đề
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#d0d0d0",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 14,
              color: "#000",
            }}
            placeholder="Vd dụ: Frontend Developer"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#000",
              marginBottom: 8,
            }}
          >
            Mô tả ngắn
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#d0d0d0",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 14,
              color: "#000",
              minHeight: 100,
              textAlignVertical: "top",
            }}
            placeholder="Giới thiệu ngắn về bản thân, mong muốn, kinh nghiệm của bạn"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Skills Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#000",
              }}
            >
              Kỹ năng liên quan (Hashtag)
            </Text>
            <TouchableOpacity onPress={handleAddSkill}>
              <Text style={{ fontSize: 12, color: "#3B82F6", fontWeight: "600" }}>
                + Thêm mới
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 8, padding: 12, backgroundColor: "#fafafa" }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {skills.map((skill, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#FFFFFF",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    borderWidth: 1,
                    borderColor: "#e0e0e0",
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#333", fontWeight: "500" }}>
                    {skill}
                  </Text>
                  <TouchableOpacity onPress={() => removeSkill(index)}>
                    <MaterialCommunityIcons name="close" size={14} color="#999" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Attachment Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#000",
              marginBottom: 12,
            }}
          >
            Đính kèm hồ sơ
          </Text>
          
          {/* Search-like Bar - 2 Parts */}
          <View
            style={{
              flexDirection: "row",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#d0e8ff",
              overflow: "hidden",
            }}
          >
            {/* Left part - White background */}
            <View
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            />
            {/* Right part - Light blue background with button */}
            <TouchableOpacity
              onPress={handleAddAttachment}
              style={{
                backgroundColor: "#eff6ff",
                paddingHorizontal: 16,
                paddingVertical: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 13, color: "#3B82F6", fontWeight: "600" }}>
                + Thêm
              </Text>
            </TouchableOpacity>
          </View>

          {/* Attachments List */}
          {attachments.length > 0 && (
            <View style={{ marginTop: 12 }}>
              {attachments.map((attachment, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#333" }}>
                    {attachment}
                  </Text>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="close"
                      size={16}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Post Button */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 16,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={handlePostProfile}
            style={{
              backgroundColor: "#3B82F6",
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
              width: 230,
              height: 35,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Đăng hồ sơ
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
