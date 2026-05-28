import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { changePassword } from "@/services/auth.api";
import { showError, showSuccess } from "@/utils/toast";
import { useRouter } from "expo-router";

export default function ChangePasswordScreen() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const validatePassword = (password: string) => {
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      hasLength,
      hasNumber,
      hasSpecial,
    };
  };

  const rules = validatePassword(newPassword);

  const handleChangePassword = async () => {
    if (!oldPassword) {
      return showError("Lỗi", "Vui lòng nhập mật khẩu cũ");
    }

    if (!newPassword) {
      return showError("Lỗi", "Vui lòng nhập mật khẩu mới");
    }

    if (newPassword !== confirmPassword) {
      return showError("Lỗi", "Mật khẩu xác nhận không khớp");
    }

    if (!rules.hasLength || !rules.hasNumber || !rules.hasSpecial) {
      return showError("Lỗi", "Mật khẩu yếu. Vui lòng nhập mật khẩu mạnh hơn");
    }

    try {
      setLoading(true);

      await changePassword(oldPassword, newPassword);

      showSuccess("Thành công", "Đổi mật khẩu thành công");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      showError("Lỗi", err?.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()}>
              <Image
                source={require("../../assets/myApp/arrow.png")}
                style={styles.titleIcon}
              />
            </Pressable>

            <Text style={styles.title}>Đổi mật khẩu</Text>
          </View>

          <Text style={styles.description}>
            Vui lòng nhập mật khẩu hiện tại và thiết lập mật khẩu mới cho tài
            khoản của bạn.
          </Text>

          {/* OLD PASSWORD */}
          <Text style={styles.label}>Mật khẩu cũ</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />

            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showOldPassword}
              value={oldPassword}
              onChangeText={setOldPassword}
              style={styles.input}
            />

            <Pressable onPress={() => setShowOldPassword(!showOldPassword)}>
              <Ionicons
                name={showOldPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#6B7280"
              />
            </Pressable>
          </View>

          {/* NEW PASSWORD */}
          <Text style={styles.label}>Mật khẩu mới</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />

            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
            />

            <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
              <Ionicons
                name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#6B7280"
              />
            </Pressable>
          </View>

          {/* CONFIRM PASSWORD */}
          <Text style={styles.label}>Xác nhận mật khẩu mới</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />

            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />

            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#6B7280"
              />
            </Pressable>
          </View>

          {/* RULES */}
          <View style={styles.ruleBox}>
            <View style={styles.ruleItem}>
              <Ionicons
                name={rules.hasLength ? "checkmark-circle" : "ellipse-outline"}
                size={16}
                color={rules.hasLength ? "#16A34A" : "#374151"}
              />

              <Text style={styles.ruleText}>Ít nhất 8 ký tự</Text>
            </View>

            <View style={styles.ruleItem}>
              <Ionicons
                name={rules.hasNumber ? "checkmark-circle" : "ellipse-outline"}
                size={16}
                color={rules.hasNumber ? "#16A34A" : "#374151"}
              />

              <Text style={styles.ruleText}>Chứa ít nhất một chữ số</Text>
            </View>

            <View style={styles.ruleItem}>
              <Ionicons
                name={rules.hasSpecial ? "checkmark-circle" : "ellipse-outline"}
                size={16}
                color={rules.hasSpecial ? "#16A34A" : "#374151"}
              />

              <Text style={styles.ruleText}>Chứa ký tự đặc biệt</Text>
            </View>
          </View>

          {/* BUTTON */}
          <Pressable style={styles.button} onPress={handleChangePassword}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cập nhật mật khẩu</Text>
            )}
          </Pressable>

          {/* SECURITY TIP */}
          <View style={styles.tipBox}>
            <Ionicons name="shield-checkmark" size={18} color="#1D4ED8" />

            <View style={{ flex: 1 }}>
              <Text style={styles.tipTitle}>Mẹo bảo mật</Text>

              <Text style={styles.tipText}>
                Sử dụng cụm từ dễ nhớ nhưng khó đoán với người khác. Không nên
                dùng ngày sinh hoặc tên của bạn.
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F5",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    height: "100%",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
    marginTop: 20,
  },

  securityText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1D4ED8",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 28,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  inputWrapper: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  ruleBox: {
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 22,
  },

  ruleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  ruleText: {
    fontSize: 13,
    color: "#374151",
  },

  button: {
    height: 56,
    backgroundColor: "#1D4ED8",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  tipBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#EEF2FF",
    padding: 14,
    borderRadius: 14,
  },

  tipTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  tipText: {
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
  },
  titleIcon: {
    width: 24,
    height: 24,
  },
});
