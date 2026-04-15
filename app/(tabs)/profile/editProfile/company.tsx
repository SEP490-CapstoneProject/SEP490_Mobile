import { useLoading } from "@/components/LoadingContext";
import { updateCompanyProfile } from "@/services/profile.api";
import { showError, showSuccess } from "@/utils/toast";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function EditCompanyProfile() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const user = params.user ? JSON.parse(params.user as string) : null;

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [taxId, setTaxId] = useState<string>("");
  const [activityField, setActivityField] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { showLoading, hideLoading } = useLoading();

  // 🔥 GIỐNG USER → set state ban đầu
  useEffect(() => {
    if (user) {
      setName(user.companyName || "");
      setTaxId(user.taxIdentification?.toString() || "");
      setActivityField(user.activityField || "");
      setAddress(user.address || "");
      setDescription(user.description || "");
      setAvatar(user.avatar || null);
      setCoverImage(user.coverImage || null);
    }
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
      showLoading();
      await updateCompanyProfile({
        id: user.id,
        companyName: name,
        activityField,
        taxIdentification: taxId ? Number(taxId) : undefined,
        address,
        description,
        avatar,
        coverImage,
      });
      hideLoading();
      showSuccess("Thành công", "Cập nhật thông tin cá nhân thành công");
      router.replace("/(tabs)/profile/company");
    } catch (err: any) {
      hideLoading();
      showError("Lỗi", err.message || "Cập nhật thất bại");
    }
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../../assets/myApp/arrow.png")}
            style={styles.headerIcon}
          />
        </Pressable>
        <Text style={styles.title}>Chỉnh sửa thông tin cá nhân</Text>
      </View>

      <ScrollView>
        <View>
          <View>
            <Image
              source={{ uri: coverImage ?? user?.coverImage }}
              style={styles.coverImage}
            />
            <Pressable
              style={styles.cameraCover}
              onPress={() => pickImage(setCoverImage)}
            >
              <Image
                source={require("../../../../assets/myApp/camera.png")}
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
                source={require("../../../../assets/myApp/camera.png")}
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
                source={require("../../../../assets/myApp/user.png")}
                style={styles.iconTextLeft}
              />
              <Image
                source={require("../../../../assets/myApp/pencil.png")}
                style={styles.iconTextRight}
              />
              <TextInput
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
                source={require("../../../../assets/myApp/no-tax.png")}
                style={styles.iconTextLeft}
              />
              <Image
                source={require("../../../../assets/myApp/padlock.png")}
                style={styles.iconTextRight}
              />
              <TextInput
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
                source={require("../../../../assets/myApp/pencil.png")}
                style={styles.iconTextRight}
              />
              <TextInput
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
                source={require("../../../../assets/myApp/maps-and-flags1.png")}
                style={styles.iconTextLeft}
              />
              <Image
                source={require("../../../../assets/myApp/pencil.png")}
                style={styles.iconTextRight}
              />
              <TextInput
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
                source={require("../../../../assets/myApp/pencil.png")}
                style={styles.iconTextRight}
              />
              <TextInput
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { paddingLeft: 10 }]}
              />
            </View>
          </View>

          <View style={{ gap: 7 }}>
            <Text style={styles.label}>Email</Text>
            <View style={{ position: "relative" }}>
              <Image
                source={require("../../../../assets/myApp/mail1.png")}
                style={styles.iconTextLeft}
              />
              <Image
                source={require("../../../../assets/myApp/padlock.png")}
                style={styles.iconTextRight}
              />
              <TextInput
                placeholder={user?.email}
                style={styles.input}
                editable={false}
              />
            </View>
          </View>
        </View>

        <View>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            <Image
              source={require("../../../../assets/myApp/check1.png")}
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
  },
  headerIcon: {
    width: 23,
    height: 23,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
});
