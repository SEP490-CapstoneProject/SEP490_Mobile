import { useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useLoading } from "./LoadingContext";

export default function RatingModal({
  visible,
  ratingData,
  setRatingData,
  loading,
  onClose,
  onSubmit,
}: any) {
  if (!visible) return null;

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (loading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [loading]);
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Chấm điểm</Text>

        {/* Stars */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
              <Pressable
                key={s}
                onPress={() =>
                  setRatingData((prev: any) => ({ ...prev, score: s }))
                }
              >
                <Text
                  style={{
                    fontSize: 23,
                    color: s <= ratingData.score ? "orange" : "#ccc",
                  }}
                >
                  ★
                </Text>
              </Pressable>
            ))}
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#333",
            }}
          >
            {ratingData.score}/10
          </Text>
        </View>

        {/* Content */}
        <TextInput
          placeholder="Nhận xét..."
          value={ratingData.content}
          onChangeText={(text) =>
            setRatingData((prev: any) => ({ ...prev, content: text }))
          }
          style={styles.input}
          multiline
        />

        {/* Buttons */}
        <View style={styles.actions}>
          <Pressable onPress={onClose}>
            <Text>Hủy</Text>
          </Pressable>

          <Pressable onPress={onSubmit}>
            <Text style={{ color: "blue" }}>Lưu</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
