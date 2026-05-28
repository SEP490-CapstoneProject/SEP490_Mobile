import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";

import {
  forgotPassword,
  resetPassword,
  verifyResetToken,
} from "@/services/auth.api";
import { showError, showSuccess } from "@/utils/toast";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState(1);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const otpValue = otp.join("");

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

  const handleSendOTP = async () => {
    try {
      if (!email) {
        return showError(
          "Email không hợp lệ",
          "Vui lòng nhập đúng định dạng email",
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return showError(
          "Email không hợp lệ",
          "Vui lòng nhập đúng định dạng email",
        );
      }
      setLoading(true);

      await forgotPassword(email);

      showSuccess("Thành công", "Đã gửi mã OTP");

      setStep(2);
    } catch (err: any) {
      showError("Lỗi", err?.message || "Gửi OTP thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      if (otpValue.length < 6) {
        return showError("Lỗi", "Vui lòng nhập đầy đủ 6 chữ số OTP");
      }

      setLoading(true);

      await verifyResetToken(email, otpValue);

      showSuccess("Thành công", "Xác minh OTP thành công");

      setStep(3);
    } catch (err: any) {
      showError("Lỗi", err?.message || "OTP không hợp lệ");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return showError("Lỗi", "Mật khẩu xác nhận không khớp");
    }

    try {
      setLoading(true);

      await resetPassword(email, otpValue, newPassword);

      showSuccess("Thành công", "Đổi mật khẩu thành công");
      router.push("/(auth)/login");
    } catch (err: any) {
      showError("Lỗi", err?.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];

    newOtp[index] = text;

    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          {/* <View style={styles.topBar}>
          <Ionicons name="arrow-back" size={22} color="#1D4ED8" />

          <Text style={styles.securityText}>Security</Text>
        </View> */}

          {/* PROGRESS */}
          <View style={styles.progressHeader}>
            <Text style={styles.stepText}>BƯỚC {step} / 3</Text>

            <Text style={styles.progressText}>
              {step === 1
                ? "Nhận diện"
                : step === 2
                  ? "66% Hoàn tất"
                  : "Hoàn tất"}
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                },
              ]}
            />
          </View>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <Text style={styles.title}>Quên mật khẩu?</Text>

              <Text style={styles.description}>
                Vui lòng nhập địa chỉ email của bạn để nhận mã xác thực.
              </Text>

              <Text style={styles.label}>Email</Text>

              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={18} color="#9CA3AF" />

                <TextInput
                  placeholder="example@email.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />
              </View>

              <View style={styles.tipBox}>
                <Ionicons name="shield-checkmark" size={18} color="#1D4ED8" />

                <View style={{ flex: 1 }}>
                  <Text style={styles.tipTitle}>Mẹo bảo mật</Text>

                  <Text style={styles.tipText}>
                    Sử dụng địa chỉ email bạn đã đăng ký tài khoản để chúng tôi
                    có thể nhận diện và hỗ trợ bạn nhanh chóng nhất.
                  </Text>
                </View>
              </View>

              <Pressable style={styles.button} onPress={handleSendOTP}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Gửi mã</Text>
                )}
              </Pressable>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <Text style={styles.title}>Xác thực OTP</Text>

              <Text style={styles.description}>
                Mã xác thực đã được gửi đến email của bạn. Vui lòng nhập mã 6
                chữ số.
              </Text>

              <View style={styles.otpContainer}>
                {otp.map((item, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    value={item}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={[
                      styles.otpInput,
                      item && {
                        borderColor: "#1D4ED8",
                        backgroundColor: "#EEF2FF",
                      },
                    ]}
                    textAlign="center"
                  />
                ))}
              </View>

              <Text style={styles.resendText}>Gửi lại mã</Text>

              <Pressable style={styles.button} onPress={handleVerifyOTP}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Xác nhận</Text>
                )}
              </Pressable>

              <View style={styles.tipBox}>
                <Ionicons name="lock-closed" size={18} color="#1D4ED8" />

                <View style={{ flex: 1 }}>
                  <Text style={styles.tipTitle}>Mẹo bảo mật</Text>

                  <Text style={styles.tipText}>
                    Không bao giờ chia sẻ mã OTP của bạn với bất kỳ ai, kể cả
                    nhân viên của chúng tôi.
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Text style={styles.title}>Mật khẩu mới</Text>

              <Text style={styles.description}>
                Thiết lập mật khẩu mới cho tài khoản của bạn.
              </Text>

              <Text style={styles.label}>Mật khẩu mới</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#9CA3AF"
                />

                <TextInput
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  style={styles.input}
                  placeholderTextColor="#9CA3AF"
                />

                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#6B7280"
                  />
                </Pressable>
              </View>

              <Text style={styles.label}>Xác nhận mật khẩu</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#9CA3AF"
                />

                <TextInput
                  placeholder="••••••••"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                  placeholderTextColor="#9CA3AF"
                />

                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color="#6B7280"
                  />
                </Pressable>
              </View>

              {/* RULES */}
              <View style={styles.ruleBox}>
                <View style={styles.ruleItem}>
                  <Ionicons
                    name={
                      rules.hasLength ? "checkmark-circle" : "ellipse-outline"
                    }
                    size={16}
                    color={rules.hasLength ? "#16A34A" : "#374151"}
                  />

                  <Text style={styles.ruleText}>Ít nhất 8 ký tự</Text>
                </View>

                <View style={styles.ruleItem}>
                  <Ionicons
                    name={
                      rules.hasNumber ? "checkmark-circle" : "ellipse-outline"
                    }
                    size={16}
                    color={rules.hasNumber ? "#16A34A" : "#374151"}
                  />

                  <Text style={styles.ruleText}>Chứa ít nhất một chữ số</Text>
                </View>

                <View style={styles.ruleItem}>
                  <Ionicons
                    name={
                      rules.hasSpecial ? "checkmark-circle" : "ellipse-outline"
                    }
                    size={16}
                    color={rules.hasSpecial ? "#16A34A" : "#374151"}
                  />

                  <Text style={styles.ruleText}>Chứa ký tự đặc biệt</Text>
                </View>
              </View>

              <Pressable style={styles.button} onPress={handleResetPassword}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Cập nhật mật khẩu</Text>
                )}
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F5",
    justifyContent: "center",
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },

  securityText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1D4ED8",
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  stepText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },

  progressText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  progressBar: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    marginBottom: 28,
  },

  progressFill: {
    height: 4,
    backgroundColor: "#1D4ED8",
    borderRadius: 999,
  },

  title: {
    fontSize: 34,
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
    height: 56,
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

  tipBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#EEF2FF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 24,
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

  button: {
    height: 56,
    backgroundColor: "#1D4ED8",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  otpInput: {
    width: 46,
    height: 56,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  resendText: {
    textAlign: "center",
    color: "#1D4ED8",
    fontWeight: "600",
    marginBottom: 20,
  },

  rule: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 6,
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
});
