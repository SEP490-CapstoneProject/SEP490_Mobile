import { register } from "@/services/auth.api";
import { showError, showSuccess } from "@/utils/toast";
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

      await register(email, password, role);

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

      <View style={styles.anotherLogin}>
        <View style={styles.line}></View>
        <Text style={styles.anotherText}>Hoặc đăng nhập với</Text>
        <View style={styles.line}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },

  inputWrapper: {
    position: "relative",
    marginBottom: 15,
  },

  icon: {
    position: "absolute",
    left: 12,
    top: "50%",
    width: 20,
    height: 20,
    transform: [{ translateY: -10 }],
    tintColor: "#6B7280",
    zIndex: 1,
  },

  input: {
    height: 44,
    borderColor: "#6B7280",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
    fontSize: 14,
    paddingLeft: 44,
    paddingRight: 40,
  },
  iconRight: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },

  eye: {
    width: 20,
    height: 20,
    tintColor: "#6B7280",
  },

  forgetPassword: {
    color: "#028AE0",
    textAlign: "right",
    marginBottom: 30,
  },

  LoginButton: {
    height: 44,
    backgroundColor: "#028AE0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  LoginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  anotherLogin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  line: {
    height: 2,
    backgroundColor: "#B2B9C1",
    width: "30%",
  },

  anotherText: {
    fontSize: 14,
    color: "#B2B9C1",
  },
  roleContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  roleButton: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#6B7280",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E2E8F0",
  },

  roleRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  roleLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  roleButtonActive: {
    backgroundColor: "#028AE0",
    borderColor: "#028AE0",
  },

  roleText: {
    color: "#6B7280",
    fontSize: 14,
  },

  roleTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
