import { useConfirm } from "@/components/ConfirmContext";
import { useLoading } from "@/components/LoadingContext";
import { login } from "@/services/auth.api";
import { showError } from "@/utils/toast";
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

export default function Login() {
  const { showConfirm } = useConfirm();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showLoading, hideLoading } = useLoading();

  const handleLogin = async () => {
    if (!email || !password) {
      showError("Đăng nhập thất bại", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showError("Email không hợp lệ", "Vui lòng nhập đúng định dạng email");
      return;
    }
    showLoading();
    const res = await login(email, password);
    hideLoading();
    if (!res) {
      showError("Đăng nhập thất bại!", "Email hoặc mật khẩu không đúng");
      return;
    }

    router.replace("/");
  };

  // const handleDelete = () => {
  //   showConfirm({
  //     title: "Xóa bài đăng",
  //     message: "Bạn có chắc muốn xóa không?",
  //     onConfirm: async () => {
  //       await deletePost(id);
  //       showSuccess("Xóa thành công", "");
  //     },
  //   });
  // };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Đăng nhập tại đây.
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
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setPassword}
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
      <Text
        style={styles.forgetPassword}
        onPress={() => router.push(`/forgotPassword`)}
      >
        Quên mật khẩu?
      </Text>

      <Pressable style={styles.LoginButton} onPress={handleLogin}>
        <Text style={styles.LoginButtonText}>Đăng nhập</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 8,
    color: "#1E293B",
    fontWeight: "600",
    marginLeft: 2,
  },

  inputWrapper: {
    position: "relative",
    marginBottom: 18,
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
    height: 50,
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
    marginBottom: 28,
    fontWeight: "600",
    fontSize: 14,
  },

  LoginButton: {
    height: 56,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  LoginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
