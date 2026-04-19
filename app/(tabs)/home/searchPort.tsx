import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CandidateFilter() {
  const [expanded, setExpanded] = useState(true);
  const [job, setJob] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const addSkill = () => {
    const value = skill.trim();
    if (!value || skills.includes(value)) return;
    setSkills([...skills, value]);
    setSkill("");
  };

  const clearAll = () => {
    setJob("");
    setSkill("");
    setSkills([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Pressable style={styles.header} onPress={() => setExpanded(!expanded)}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Ionicons name="options-outline" size={18} color="#3B82F6" />
            <Text style={styles.title}>Bộ lọc ứng viên</Text>
          </View>

          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={18}
            color="#555"
          />
        </Pressable>

        {expanded && (
          <View style={styles.content}>
            {/* Vị trí */}
            <Text style={styles.label}>Vị trí công việc</Text>
            <TextInput
              placeholder="Nhập vị trí..."
              value={job}
              onChangeText={setJob}
              style={styles.input}
            />

            <Text style={styles.label}>Kỹ năng</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="Nhập kỹ năng..."
                value={skill}
                onChangeText={setSkill}
                onSubmitEditing={addSkill}
                style={[styles.input, { flex: 1 }]}
              />

              <Pressable style={styles.addBtn} onPress={addSkill}>
                <Ionicons name="add" size={20} color="#fff" />
              </Pressable>
            </View>

            <View style={styles.skillList}>
              {skills.map((s, i) => (
                <View key={i} style={styles.skillItem}>
                  <Text style={{ color: "#fff", fontSize: 12 }}>{s}</Text>
                  <Pressable
                    onPress={() => {
                      setSkills(skills.filter((_, index) => index !== i));
                    }}
                  >
                    <Ionicons name="close" size={12} color="#fff" />
                  </Pressable>
                </View>
              ))}
            </View>

            <Pressable style={styles.applyBtn}>
              <Text style={styles.applyText}>Áp dụng bộ lọc</Text>
            </Pressable>

            <Pressable onPress={clearAll}>
              <Text style={styles.clearText}>Xóa tất cả bộ lọc</Text>
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

  addBtn: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 10,
    marginLeft: 8,
  },

  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  skillItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#3B82F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  applyBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontWeight: "600",
  },

  clearText: {
    textAlign: "center",
    marginTop: 10,
    color: "#888",
  },
});
