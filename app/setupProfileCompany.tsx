import { getAuth } from "@/services/auth.api";
import {
  createCompanyProfile,
  fetchCompanyProfile,
} from "@/services/profile.api";
import { showError } from "@/utils/toast";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SetupProfileCompany() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [taxId, setTaxId] = useState<string>("");
  const [activityField, setActivityField] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    getAuth().then(setUser);
  }, []);

  const pickImage = async (onPick: (uri: string) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onPick(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      if (name.trim() === "") {
        alert("Vui lòng nhập tên công ty");
        return;
      }
      await createCompanyProfile({
        companyName: name,
        activityField: activityField,
        taxIdentification: taxId,
        address,
        description,
        avatar,
        coverImage,
      });

      await fetchCompanyProfile();
      router.replace("/(tabs)/home");
    } catch (err: any) {
      showError("Lỗi", err.message || "Tạo hồ sơ thất bại");
    }
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Chào mừng người mới</Text>
      </View>
      {/* body */}
      <ScrollView style={{ flex: 1, marginBottom: 50 }}>
        <View>
          <View>
            {coverImage || user?.coverImage ? (
              <Image
                source={{ uri: coverImage ?? user?.coverImage }}
                style={styles.coverImage}
              />
            ) : (
              <View style={styles.coverPlaceholder}>
                <Text style={styles.placeholderText}>Chưa có ảnh</Text>
              </View>
            )}

            <Pressable
              style={styles.cameraCover}
              onPress={() => pickImage(setCoverImage)}
            >
              <Image
                source={require("../assets/myApp/camera.png")}
                style={styles.cameraIcon}
              />
            </Pressable>
          </View>

          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: avatar ?? user?.avatar }}
              style={styles.avatar}
            />
            <Pressable
              style={styles.cameraAvatar}
              onPress={() => pickImage(setAvatar)}
            >
              <Image
                source={require("../assets/myApp/camera.png")}
                style={styles.cameraIcon}
              />
            </Pressable>
          </View>
        </View>
        <View style={{ padding: 20, gap: 20, marginTop: 70 }}>
          <View style={{ gap: 7 }}>
            <Text style={styles.label}>Tên hiển thị</Text>
            <View style={{ position: "relative" }}>
              <Image
                source={require("../assets/myApp/user.png")}
                style={styles.iconTextLeft}
              />
              <Image
                source={require("../assets/myApp/pencil.png")}
                style={styles.iconTextRight}
              />
              <TextInput
                placeholder={"Không được để trống"}
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{ gap: 7 }}>
            <Text style={styles.label}>Mã số thuế</Text>
            <View style={{ position: "relative" }}>
              <Image
                source={require("../assets/myApp/no-tax.png")}
                style={styles.iconTextLeft}
              />
              <Image
                source={require("../assets/myApp/pencil.png")}
                style={styles.iconTextRight}
              />
              <TextInput
                placeholder={"Không được để trống"}
                value={taxId}
                onChangeText={setTaxId}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{ gap: 7 }}>
            <Text style={styles.label}>Lĩnh vực hoạt động</Text>
            <View style={{ position: "relative" }}>
              <Image
                source={require("../assets/myApp/pencil.png")}
                style={styles.iconTextRight}
              />
              <TextInput
                placeholder={"Không được để trống"}
                value={activityField}
                onChangeText={setActivityField}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{ gap: 7 }}>
            <Text style={styles.label}>Địa chỉ</Text>
            <View style={{ position: "relative" }}>
              <Image
                source={require("../assets/myApp/maps-and-flags1.png")}
                style={styles.iconTextLeft}
              />
              <Image
                source={require("../assets/myApp/pencil.png")}
                style={styles.iconTextRight}
              />
              <TextInput
                placeholder={"Không được để trống"}
                value={address}
                onChangeText={setAddress}
                style={styles.input}
              />
            </View>
          </View>

          <View style={{ gap: 7 }}>
            <Text style={styles.label}>Mô tả</Text>
            <View style={{ position: "relative" }}>
              <Image
                source={require("../assets/myApp/pencil.png")}
                style={styles.iconTextRight}
              />
              <TextInput
                placeholder={"Không được để trống"}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { paddingLeft: 10 }]}
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>xác nhận</Text>
            <Image
              source={require("../assets/myApp/check1.png")}
              style={styles.saveButtonIcon}
            />
          </Pressable>
        </View>
      </ScrollView>
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
    paddingHorizontal: 13,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1.2,
    paddingBottom: 15,
    marginTop: 30,
    gap: 20,
    justifyContent: "center",
  },
  headerIcon: {
    width: 23,
    height: 23,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  coverImage: {
    width: "100%",
    height: 190,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginTop: -40,
    marginLeft: 20,
  },
  cameraCover: {
    position: "absolute",
    right: 15,
    bottom: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 20,
  },

  avatarWrapper: {
    position: "absolute",
    bottom: -50,
  },
  cameraAvatar: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#6B7280",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraIcon: {
    width: 16,
    height: 16,
    tintColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#E2E8F0",
  },
  iconTextLeft: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 8,
    left: 10,
    zIndex: 10,
  },
  iconTextRight: {
    width: 16,
    height: 16,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#ff5454",
    paddingVertical: 9,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  saveButtonIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  coverPlaceholder: {
    height: 180,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },

  placeholderText: {
    color: "#94A3B8",
    fontSize: 14,
  },
});
