import { Picker } from "@react-native-picker/picker";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function PostCreate() {
  const router = useRouter();
  const [media, setMedia] = useState<any>(null);
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [description, setDescription] = useState("");
  const [obligatory, setObligatory] = useState("");
  const [preferred, setPreferred] = useState("");
  const [benefits, setBenefits] = useState("");

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0]);
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../../assets/myApp/arrow.png")}
            style={styles.iconHeader}
          />
        </Pressable>
        <Pressable />
        <Text style={styles.title}>Tạo thông tin tuyển dụng</Text>
      </View>
      <ScrollView style={styles.bodyContainer}>
        <View>
          {!media && (
            <Pressable style={styles.uploadBox} onPress={pickMedia}>
              <Image
                source={require("../../../../assets/myApp/upload.png")}
                style={styles.iconUpload}
              />
              <Text style={styles.title}>Chạm để tải lên</Text>
              <Text style={styles.sub}>Ảnh hoặc video</Text>
            </Pressable>
          )}

          {media && (
            <View>
              <Pressable style={styles.changeButton} onPress={pickMedia}>
                <Image
                  source={require("../../../../assets/myApp/camera.png")}
                  style={styles.cameraIcon}
                />
              </Pressable>

              {media.type === "image" && (
                <Image
                  source={{ uri: media.uri }}
                  style={styles.media}
                  resizeMode={ResizeMode.CONTAIN}
                />
              )}

              {media.type === "video" && (
                <Video
                  ref={videoRef}
                  source={{ uri: media.uri }}
                  style={styles.media}
                  resizeMode={ResizeMode.CONTAIN}
                  useNativeControls
                  isLooping
                />
              )}
            </View>
          )}
        </View>
        <View style={styles.firstContent}>
          <View style={styles.boderInput}>
            <TextInput placeholder="Vị trí tuyển dụng (VD: Senior UX/UI)" />
          </View>
          <View style={[styles.boderInput, styles.flexInput]}>
            <Image
              source={require("../../../../assets/myApp/maps-and-flags1.png")}
              style={styles.iconInput}
            />
            <TextInput placeholder="Địa điểm làm việc" />
          </View>
          <View style={[styles.boderInput, styles.flexInput]}>
            <Image
              source={require("../../../../assets/myApp/money1.png")}
              style={styles.iconInput}
            />
            <TextInput placeholder="Mức lương" />
          </View>
          <View style={[styles.boderInput]}>
            <View>
              <Picker selectedValue={""} onValueChange={() => {}}>
                <Picker.Item label="Chọn hình thức làm việc" value="" />
                <Picker.Item label="Toàn thời gian" value="full-time" />
                <Picker.Item label="Bán thời gian" value="part-time" />
                <Picker.Item label="Làm việc từ xa" value="remote" />
              </Picker>
            </View>
          </View>
          <View style={[styles.boderInput, styles.flexInput]}>
            <Image
              source={require("../../../../assets/myApp/star.png")}
              style={styles.iconInput}
            />
            <TextInput placeholder="Số năm KN" />
          </View>
          <View style={[styles.boderInput, styles.flexInput]}>
            <Image
              source={require("../../../../assets/myApp/group1.png")}
              style={styles.iconInput}
            />
            <TextInput placeholder="Số lượng cần tuyển" />
          </View>
        </View>
        <View style={styles.secondContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={styles.lineLeft} />
            <Text style={styles.title}>Mô tả công việc</Text>
          </View>
          <TextInput
            placeholder="Mô tả chi tiết công việc, trách nhiệm chính ..."
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={styles.inputDes}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.secondContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={styles.lineLeft} />
            <Text style={styles.title}>Yêu cầu chuyên môn</Text>
          </View>
          <View style={styles.boderContentSecond}>
            <View style={styles.obligatory}>
              <Text style={styles.obligatoryText}>Bắt buộc</Text>
            </View>
            <TextInput
              placeholder="Mô tả yêu cầu bắt buộc"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              style={styles.inputDes}
              value={obligatory}
              onChangeText={setObligatory}
            />
            <View style={styles.preferred}>
              <Text style={styles.preferredText}>Ưu tiên</Text>
            </View>
            <TextInput
              placeholder="Mô tả yêu cầu ưu tiên"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              style={styles.inputDes}
              value={preferred}
              onChangeText={setPreferred}
            />
          </View>
        </View>
        <View style={styles.secondContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={styles.lineLeft} />
            <Text style={styles.title}>Quyền lợi & Đãi ngộ</Text>
          </View>
          <TextInput
            placeholder="Mô tả quyền lợi & đãi ngộ"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={styles.inputDes}
            value={benefits}
            onChangeText={setBenefits}
          />
        </View>
        <View>
          <Pressable style={styles.bnt}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Đăng tin
            </Text>
            <Image
              source={require("../../../../assets/myApp/send.png")}
              style={styles.iconHeader}
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
    backgroundColor: "#fff",
  },
  iconHeader: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingRight: 20,
    gap: 10,
  },
  bodyContainer: {
    marginTop: 10,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#60a5fa",
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },

  iconUpload: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },

  sub: {
    color: "#6b7280",
    marginTop: 5,
  },

  media: {
    width: "92%",
    height: 240,
    borderRadius: 10,
    marginHorizontal: 14,
    borderWidth: 2,
    borderColor: "#60a5fa",
    overflow: "hidden",
    backgroundColor: "#e5e7eb",
  },

  changeButton: {
    position: "absolute",
    top: 7,
    right: 25,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  firstContent: {
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    borderRadius: 10,
    marginHorizontal: 14,
    marginTop: 20,
    padding: 10,
    gap: 8,
  },
  boderInput: {
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    borderRadius: 10,
  },
  iconInput: {
    width: 19,
    height: 19,
    marginLeft: 5,
    marginRight: 3,
  },
  flexInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  lineLeft: {
    backgroundColor: "#3B82F6",
    width: 4,
    height: "100%",
    borderRadius: 2,
    marginRight: 10,
  },
  secondContent: {
    marginHorizontal: 14,
    marginTop: 20,
  },
  inputDes: {
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 15,
    minHeight: 200,
  },
  boderContentSecond: {
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
  },
  obligatory: {
    borderColor: "#FF4848",
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
    marginBottom: 10,
    width: 80,
    alignItems: "center",
    backgroundColor: "#EFF6FF",
  },
  preferred: {
    borderColor: "#3B82F6",
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
    alignItems: "center",
    width: 80,
    backgroundColor: "#EFF6FF",
    marginVertical: 10,
    marginTop: 20,
  },
  obligatoryText: {
    color: "#FF4848",
    fontWeight: "bold",
  },
  preferredText: {
    color: "#3B82F6",
    fontWeight: "bold",
  },
  bnt: {
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 14,
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});
