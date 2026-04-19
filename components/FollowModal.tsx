import {
  createFollowCategory,
  getFollowCategories,
} from "@/services/portfolio.api";
import { showError } from "@/utils/toast";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function FollowModal({
  visible,
  onClose,
  onSubmit,
  defaultCategoryId,
  defaultLevel,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { categoryId: number; level: string }) => void;
  defaultCategoryId?: number;
  defaultLevel?: string;
}) {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [level, setLevel] = useState("MEDIUM");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (visible) {
      fetchCategories();
      if (defaultCategoryId) {
        setSelectedCategory(defaultCategoryId);
      }

      if (defaultLevel) {
        setLevel(defaultLevel);
      }
    }
  }, [visible]);

  const fetchCategories = async () => {
    try {
      const data = await getFollowCategories();
      setCategories(data || []);
    } catch (err) {
      showError("Update error", err as string);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const newCate = await createFollowCategory(newName);

      setCategories((prev) => [...prev, newCate]);
      setSelectedCategory(newCate.id);

      setIsCreating(false);
      setNewName("");
    } catch (err) {
      showError("Update error", err as string);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Lưu Portfolio</Text>

          <Text style={styles.label}>Chọn mục lưu</Text>

          {categories.length === 0 && !isCreating && (
            <Text style={{ marginBottom: 10 }}>Bạn chưa có mục lưu nào</Text>
          )}

          {!isCreating &&
            categories.map((item) => (
              <Pressable
                key={item.id}
                style={[
                  styles.option,
                  selectedCategory === item.id && styles.active,
                ]}
                onPress={() => setSelectedCategory(item.id)}
              >
                <Text>{item.name}</Text>
              </Pressable>
            ))}

          {isCreating ? (
            <>
              <TextInput
                placeholder="Tên mục mới..."
                value={newName}
                onChangeText={setNewName}
                style={styles.input}
              />

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  style={[styles.createBtn, { flex: 1 }]}
                  onPress={handleCreateCategory}
                >
                  <Text style={{ color: "#fff", textAlign: "center" }}>
                    Tạo
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.cancelCreateBtn}
                  onPress={() => {
                    setIsCreating(false);
                    setNewName("");
                  }}
                >
                  <Text style={{ textAlign: "center" }}>Hủy</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <Pressable
              style={styles.addBtn}
              onPress={() => setIsCreating(true)}
            >
              <Text style={{ color: "#2563EB" }}>+ Tạo mục mới</Text>
            </Pressable>
          )}
          {selectedCategory && (
            <>
              <Text style={styles.label}>Mức độ ưu tiên</Text>

              {[
                { label: "Mức độ thấp", value: "LOW" },
                { label: "Mức độ trung bình", value: "MEDIUM" },
                { label: "Mức độ cao", value: "HIGH" },
              ].map((item) => (
                <Pressable
                  key={item.value}
                  style={[styles.option, level === item.value && styles.active]}
                  onPress={() => setLevel(item.value)}
                >
                  <Text>{item.label}</Text>
                </Pressable>
              ))}
            </>
          )}

          <View style={styles.actions}>
            <Pressable onPress={onClose}>
              <Text>Hủy</Text>
            </Pressable>

            <Pressable
              disabled={!selectedCategory}
              onPress={() => {
                onSubmit({
                  categoryId: selectedCategory!,
                  level,
                });
                onClose();
              }}
            >
              <Text
                style={{
                  color: selectedCategory ? "#2563EB" : "#999",
                  fontWeight: "bold",
                }}
              >
                Lưu
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: "88%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 8,
  },

  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },

  active: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },

  addBtn: {
    paddingVertical: 10,
    alignItems: "center",
  },

  createBtn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cancelCreateBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
