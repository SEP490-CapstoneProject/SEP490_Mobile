import {
    ActivityIndicator,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { AlertCircle, X } from "lucide-react-native";

import { useEffect, useState } from "react";

import {
    createChallenge,
    getChallengeDetail,
    updateChallenge,
} from "@/services/challenge.api";
import { CreateChallengePayload } from "@/utils/challenge";
import { showError, showSuccess } from "@/utils/toast";
import DateTimePicker from "@react-native-community/datetimepicker";

interface CreateChallengeFormProps {
  challengeId?: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData extends CreateChallengePayload {
  deadlineDate: Date | null;
}

export default function CreateChallengeForm({
  challengeId,
  onClose,
  onSuccess,
}: CreateChallengeFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    expectedSolution: "",
    deadline: "",
    deadlineDate: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (challengeId) {
      loadChallenge();
    }
  }, [challengeId]);

  const loadChallenge = async () => {
    try {
      setIsLoading(true);

      const challenge = await getChallengeDetail(challengeId!);

      const deadlineDate = new Date(challenge.deadline);

      setFormData({
        title: challenge.title,
        description: challenge.description || "",
        expectedSolution: challenge.expectedSolution || "",
        deadline: challenge.deadline,
        deadlineDate,
      });
    } catch (err: any) {
      setError(err?.message || "Lỗi tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError(null);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Tên thử thách không được để trống");
      return false;
    }

    if (!(formData.description || "").trim()) {
      setError("Mô tả không được để trống");
      return false;
    }
    if (!(formData.expectedSolution || "").trim()) {
      setError("Giải pháp không được để trống");
      return false;
    }

    if (!formData.deadlineDate) {
      setError("Deadline không được để trống");
      return false;
    }

    if (formData.deadlineDate <= new Date()) {
      setError("Deadline phải ở tương lai");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const payload: CreateChallengePayload = {
        title: formData.title.trim(),
        description: formData.description?.trim() || undefined,
        expectedSolution: formData.expectedSolution?.trim() || undefined,
        deadline: formData.deadline,
      };

      if (challengeId) {
        await updateChallenge(challengeId, payload);

        showSuccess("Cập nhật thử thách thành công", "");
      } else {
        await createChallenge(payload);

        showSuccess("Tạo thử thách thành công", "");
      }

      onSuccess();
    } catch (err: any) {
      showError("Có lỗi xảy ra", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {challengeId ? "Chỉnh sửa thử thách" : "Tạo thử thách"}
            </Text>

            <TouchableOpacity disabled={isSubmitting} onPress={onClose}>
              <X size={24} color="#475569" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 40,
            }}
          >
            {error && (
              <View style={styles.errorBox}>
                <AlertCircle size={20} color="#DC2626" />

                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {isLoading ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color="#2563EB" />

                <Text style={{ marginTop: 12 }}>Đang tải dữ liệu...</Text>
              </View>
            ) : (
              <>
                {/* TITLE */}
                <View style={styles.field}>
                  <Text style={styles.label}>
                    Tên thử thách <Text style={{ color: "red" }}>*</Text>
                  </Text>

                  <TextInput
                    value={formData.title}
                    onChangeText={(text) => handleChange("title", text)}
                    placeholder="Ví dụ: Build Authentication System"
                    placeholderTextColor="#000000"
                    style={styles.input}
                  />
                </View>

                {/* DESCRIPTION */}
                <View style={styles.field}>
                  <Text style={styles.label}>Mô tả</Text>

                  <TextInput
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                    value={formData.description}
                    onChangeText={(text) => handleChange("description", text)}
                    placeholder="Mô tả chi tiết thử thách..."
                    placeholderTextColor="#000000"
                    style={[styles.input, styles.textArea]}
                  />
                </View>

                {/* EXPECTED */}
                <View style={styles.field}>
                  <Text style={styles.label}>Giải pháp mong đợi</Text>

                  <TextInput
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                    value={formData.expectedSolution}
                    onChangeText={(text) =>
                      handleChange("expectedSolution", text)
                    }
                    placeholder="Mô tả giải pháp mong đợi..."
                    style={[styles.input, styles.textArea]}
                    placeholderTextColor="#000000"
                  />
                </View>

                {/* DEADLINE */}
                <View style={styles.field}>
                  <Text style={styles.label}>
                    Hạn chót <Text style={{ color: "red" }}>*</Text>
                  </Text>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text
                      style={{
                        color: formData.deadlineDate ? "#0F172A" : "#94A3B8",
                      }}
                    >
                      {formData.deadlineDate
                        ? formData.deadlineDate.toLocaleString("vi-VN")
                        : "Chọn ngày giờ"}
                    </Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={formData.deadlineDate || new Date()}
                      mode="date"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);

                        if (selectedDate) {
                          setFormData((prev) => ({
                            ...prev,
                            deadlineDate: selectedDate,
                          }));

                          setShowTimePicker(true);
                        }
                      }}
                    />
                  )}

                  {showTimePicker && (
                    <DateTimePicker
                      value={formData.deadlineDate || new Date()}
                      mode="time"
                      is24Hour
                      onChange={(event, selectedTime) => {
                        setShowTimePicker(false);

                        if (selectedTime) {
                          const finalDate = new Date(
                            formData.deadlineDate || new Date(),
                          );

                          finalDate.setHours(selectedTime.getHours());
                          finalDate.setMinutes(selectedTime.getMinutes());

                          setFormData((prev) => ({
                            ...prev,
                            deadlineDate: finalDate,
                            deadline: finalDate.toISOString(),
                          }));
                        }
                      }}
                    />
                  )}
                </View>

                {/* BUTTONS */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    disabled={isSubmitting}
                    onPress={onClose}
                  >
                    <Text style={styles.cancelButtonText}>Hủy</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.submitButton}
                    disabled={isSubmitting}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitButtonText}>
                      {isSubmitting
                        ? "Đang lưu..."
                        : challengeId
                          ? "Cập nhật"
                          : "Tạo thử thách"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },

  modal: {
    backgroundColor: "#fff",
    borderRadius: 18,
    maxHeight: "90%",
    overflow: "hidden",
  },

  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  errorBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },

  errorText: {
    flex: 1,
    color: "#B91C1C",
  },

  loadingBox: {
    alignItems: "center",
    paddingVertical: 40,
  },

  field: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#0F172A",
  },

  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    backgroundColor: "#fff",
  },

  textArea: {
    minHeight: 120,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  cancelButtonText: {
    fontWeight: "600",
    color: "#334155",
  },

  submitButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
