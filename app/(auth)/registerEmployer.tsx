import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function RegisterEmployerPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showFogetPassword, setShowFogetPassword] = useState(false);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Đăng ký là nhà tuyển dụng.
      </Text>

      <Text style={styles.label}>Tên hiển thị</Text>
      <View style={styles.inputWrapper}>
        <Image
          source={require("../../assets/myApp/id-card.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Nhập tên công ty/tổ chức"
          style={styles.input}
        />
      </View>

      <Text style={styles.label}>Mã số thuế</Text>
      <View style={styles.inputWrapper}>
        <Image
          source={require("../../assets/myApp/no-tax.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Nhập mã số thuế"
          style={styles.input}
        />
      </View>

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper}>
        <Image
          source={require("../../assets/myApp/mail.png")}
          style={styles.icon}
        />
        <TextInput placeholder="Nhập địa chỉ email" style={styles.input} />
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

      <Text
        style={styles.forgetPassword}
        onPress={() => router.push("/(auth)/register")}
      >
        Quay lại đăng ký người dùng?
      </Text>

      <Pressable style={styles.LoginButton} onPress={() => {}}>
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
});
