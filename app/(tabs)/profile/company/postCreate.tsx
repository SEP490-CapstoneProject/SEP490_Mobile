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
  View,
} from "react-native";

export default function PostCreate() {
  const router = useRouter();
  const [media, setMedia] = useState<any>(null);
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
});
