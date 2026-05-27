import { useLoading } from "@/components/LoadingContext";
import { register } from "@/services/auth.api";
import { showError, showSuccess } from "@/utils/toast";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showFogetPassword, setShowFogetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(1);
  const { showLoading, hideLoading } = useLoading();

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

  const rules = validatePassword(password);

  const handleRegister = async () => {
    try {
      if (!email || !password || !confirmPassword) {
        showError("Đăng kí thất bại!", "Vui lòng nhập đầy đủ thông tin");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError("Đăng kí thất bại!", "Email không hợp lệ");
        return;
      }

      if (password !== confirmPassword) {
        showError("Đăng kí thất bại!", "Mật khẩu không khớp");
        return;
      }
      showLoading();
      await register(email, password, role);
      hideLoading();
      showSuccess("", "Đăng ký thành công");

      router.replace("/(auth)/login");
    } catch (err: any) {
      showError("Lỗi", err.message || "Đã xảy ra lỗi rồi :(");
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Đăng ký tại đây.
      </Text>

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper}>
        <Image
          source={require("../../assets/myApp/mail.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Nhập địa chỉ email"
          placeholderTextColor="black"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <Text style={styles.label}>Mật khẩu</Text>
      <View style={styles.inputWrapper}>
        <Image
          source={require("../../assets/myApp/locked-computer.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Nhập mật khẩu"
          placeholderTextColor="black"
          secureTextEntry={!showPassword}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <Pressable
          style={styles.iconRight}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={
              showPassword
                ? require("../../assets/myApp/show.png")
                : require("../../assets/myApp/hide.png")
            }
            style={styles.eye}
          />
        </Pressable>
      </View>

      <Text style={styles.label}>Xác nhận mật khẩu</Text>
      <View style={styles.inputWrapper}>
        <Image
          source={require("../../assets/myApp/undo.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor="black"
          secureTextEntry={!showFogetPassword}
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <Pressable
          style={styles.iconRight}
          onPress={() => setShowFogetPassword(!showFogetPassword)}
        >
          <Image
            source={
              showFogetPassword
                ? require("../../assets/myApp/show.png")
                : require("../../assets/myApp/hide.png")
            }
            style={styles.eye}
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

      <Text style={styles.label}>Đăng kí với tư cách là</Text>
      <View style={styles.roleContainer}>
        <Pressable
          style={[
            styles.roleButton,
            role === 1 && styles.roleButtonActive,
            styles.roleLeft,
          ]}
          onPress={() => setRole(1)}
        >
          <Text style={[styles.roleText, role === 1 && styles.roleTextActive]}>
            Người dùng
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.roleButton,
            role === 2 && styles.roleButtonActive,
            styles.roleRight,
          ]}
          onPress={() => setRole(2)}
        >
          <Text style={[styles.roleText, role === 2 && styles.roleTextActive]}>
            Nhà tuyển dụng
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.LoginButton} onPress={handleRegister}>
        <Text style={styles.LoginButtonText}>Đăng ký</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "600",
    marginLeft: 2,
  },

  inputWrapper: {
    position: "relative",
    marginBottom: 15,
  },

  icon: {
    position: "absolute",
    left: 14,
    top: "50%",
    width: 20,
    height: 20,
    transform: [{ translateY: -10 }],
    tintColor: "#64748B",
    zIndex: 1,
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    color: "#0F172A",
    paddingLeft: 48,
    paddingRight: 48,
  },

  iconRight: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },

  eye: {
    width: 20,
    height: 20,
    tintColor: "#64748B",
  },

  forgetPassword: {
    color: "#2563EB",
    textAlign: "right",
    marginBottom: 30,
    fontWeight: "600",
  },

  LoginButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,

    backgroundColor: "#2563EB",
  },

  LoginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  roleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 4,
  },

  roleButton: {
    flex: 1,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  roleRight: {},

  roleLeft: {},

  roleButtonActive: {
    backgroundColor: "#2563EB",
  },

  roleText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },

  roleTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  ruleBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 5,
    paddingTop: 10,
  },

  ruleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  ruleText: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "500",
  },
});
