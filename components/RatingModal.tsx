import { fetchCriteria } from "@/services/portfolio.api";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLoading } from "./LoadingContext";

export default function RatingModal({
  visible,
  ratingData,
  setRatingData,
  loading,
  onClose,
  onSubmit,
}: any) {
  const { showLoading, hideLoading } = useLoading();

  const [criteria, setCriteria] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCriteria();
        setCriteria(data.filter((c: any) => c.isActive));
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (loading) showLoading();
    else hideLoading();
  }, [loading]);

  const toggleCriteria = (item: any) => {
    let newSelected: number[];
    if (selected.includes(item.id)) {
      newSelected = selected.filter((id) => id !== item.id);
    } else {
      newSelected = [...selected, item.id];
    }
    setSelected(newSelected);
    const selectedItems = criteria.filter((c) => newSelected.includes(c.id));
    const content = selectedItems.map((c) => `- ${c.name}`).join("\n");

    setRatingData((prev: any) => ({
      ...prev,
      content,
    }));
  };

  useEffect(() => {
    if (!ratingData.content || criteria.length === 0) return;

    const lines = ratingData.content
      .split("\n")
      .map((l: string) => l.replace("- ", "").trim());

    const matched = criteria
      .filter((c) => lines.includes(c.name))
      .map((c) => c.id);

    setSelected(matched);
  }, [ratingData.content, criteria]);

  return (
    <Pressable
      style={[styles.overlay, { display: visible ? "flex" : "none" }]}
      onPress={onClose}
    >
      <View style={styles.modal}>
        <Text style={styles.title}>Chấm điểm theo tiêu chí</Text>

        <View style={styles.scoreBox}>
          <Text style={{ marginRight: 10 }}>Điểm:</Text>
          <TextInput
            value={ratingData.score?.toString() ?? ""}
            onChangeText={(text) => {
              if (text === "") {
                setRatingData((prev: any) => ({
                  ...prev,
                  score: "",
                }));
                return;
              }
              if (!/^\d+$/.test(text)) return;

              const num = Number(text);

              if (num >= 0 && num <= 100) {
                setRatingData((prev: any) => ({
                  ...prev,
                  score: num,
                }));
              }
            }}
            keyboardType="numeric"
            style={styles.scoreInput}
            placeholder="0 - 100"
          />
        </View>

        <ScrollView style={{ maxHeight: 400 }}>
          {criteria.map((item) => {
            const isSelected = selected.includes(item.id);

            return (
              <Pressable
                key={item.id}
                style={[
                  styles.criteriaItem,
                  isSelected && {
                    backgroundColor: "#DCFCE7",
                    borderColor: "#FFFFFF",
                  },
                ]}
                onPress={() => toggleCriteria(item)}
              >
                <Text style={{ flex: 1 }}>{item.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Content preview
        <TextInput
          value={ratingData.content}
          editable={false}
          style={styles.input}
          multiline
        /> */}

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
    </Pressable>
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
  criteriaItem: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
    marginVertical: 10,
    textAlign: "center",
  },

  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  scoreInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 80,
    textAlign: "center",
  },
});
