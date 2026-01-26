import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MediaGrid from "../../../components/MediaGrid";

export default function createPost() {
  const router = useRouter();
  const [media, setMedia] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const mediaUris = media.map((item) => item.uri);
  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const pickMedia = async () => {
    if (media.length >= 4) {
      setShowLimitModal(true);
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: 4 - media.length,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia((prev) => [...prev, ...result.assets]);
    }
  };

  return (
    <View style={styles.container}>
      {/** header */}
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../assets/myApp/arrow.png")}
            style={styles.headerIcon}
          />
        </Pressable>
        <Text style={styles.title}>Tạo bài đăng</Text>
        <Pressable style={styles.bntHeader}>
          <Text style={styles.bntTextHeader}>Đăng</Text>
        </Pressable>
      </View>
      {/** body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.bodyContainer}
      >
        <TextInput
          placeholder="Bạn đang nghĩ gì? Chia sẻ cùng cộng đồng..."
          multiline
          textAlignVertical="top"
          style={styles.postInput}
          spellCheck={false}
          autoCorrect={false}
        />
        <View style={styles.media}>
          {mediaUris.length > 0 && (
            <MediaGrid media={mediaUris} onRemove={removeMedia} />
          )}
        </View>
      </ScrollView>
      {/** footer */}
      <View style={styles.footerContainer}>
        <Pressable style={styles.bntFooter} onPress={() => pickMedia()}>
          <Image
            source={require("../../../assets/myApp/gallery.png")}
            style={styles.iconFooter}
          />
          <Text style={styles.bntTextFooter}> Thêm ảnh / Video</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          style={styles.bntFooter}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Image
            source={require("../../../assets/myApp/resume.png")}
            style={styles.iconFooter}
          />
          <Text style={styles.bntTextFooter}> Hồ sơ</Text>
        </Pressable>
      </View>

      <Modal transparent visible={showLimitModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Đã đạt giới hạn</Text>
            <Text style={styles.modalText}>
              Bạn chỉ có thể chọn tối đa 4 ảnh hoặc video.
            </Text>

            <Pressable
              style={styles.modalBtn}
              onPress={() => setShowLimitModal(false)}
            >
              <Text style={styles.modalBtnText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1.2,
    paddingBottom: 15,
  },
  headerIcon: {
    width: 23,
    height: 23,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bntHeader: {
    backgroundColor: "#3B82F6",
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 15,
  },
  bntTextHeader: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  bodyContainer: {
    paddingHorizontal: 15,
  },
  postInput: {
    fontSize: 18,
    color: "#111827",
    minHeight: 40,
    maxHeight: "auto",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  media: {
    paddingVertical: 10,
  },
  footerContainer: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconFooter: {
    width: 30,
    height: 30,
  },
  bntFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  bntTextFooter: {
    color: "#3B82F6",
    fontSize: 16,
  },
  divider: {
    width: 2,
    height: 30,
    backgroundColor: "#E2E8F0",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
  },

  modalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },

  modalText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 16,
  },

  modalBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  modalBtnText: {
    color: "#3B82F6",
    fontWeight: "600",
  },
});
