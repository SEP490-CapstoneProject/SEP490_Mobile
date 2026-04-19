import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function JobFilter() {
  const [expanded, setExpanded] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Pressable style={styles.header} onPress={() => setExpanded(!expanded)}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Ionicons name="options-outline" size={18} color="#3B82F6" />
            <Text style={styles.title}>Bộ lọc việc làm</Text>
          </View>

          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={18}
            color="#555"
          />
        </Pressable>

        {expanded && (
          <View style={styles.content}>
            <View style={styles.divider} />

            <Text style={styles.label}>VỊ TRÍ</Text>
            <TextInput
              placeholder="Tìm kiếm..."
              value={keyword}
              onChangeText={setKeyword}
              style={styles.input}
            />

            <Text style={styles.label}>ĐỊA ĐIỂM</Text>
            <TextInput
              placeholder="Thành phố..."
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />

            <Pressable style={styles.applyBtn}>
              <Ionicons name="search" size={18} color="#fff" />
              <Text style={styles.applyText}> Áp dụng</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  search: {
    borderRadius: 16,
    margin: 16,
    padding: 12,
    backgroundColor: "#EFF6FF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginTop: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  content: {
    marginTop: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#555",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },

  applyBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  applyText: {
    color: "#fff",
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});
