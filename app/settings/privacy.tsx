import { useRouter } from "expo-router";
import {
    Database,
    Eye,
    Lock,
    Settings,
    Share2,
    Shield,
    Smartphone,
    Trash2,
} from "lucide-react-native";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function PrivacyScreen() {
  const router = useRouter();

  const privacyFeatures = [
    {
      icon: <Eye size={20} color="#2563eb" />,
      title: "Kiểm soát hiển thị",
      description: "Quản lý ai thấy thông tin của bạn",
    },
    {
      icon: <Lock size={20} color="#2563eb" />,
      title: "Bảo mật tài khoản",
      description: "Xác thực 2 lớp, quản lý đăng nhập",
    },
    {
      icon: <Share2 size={20} color="#2563eb" />,
      title: "Chia sẻ dữ liệu",
      description: "Kiểm soát dữ liệu với bên thứ 3",
    },
    {
      icon: <Database size={20} color="#2563eb" />,
      title: "Dữ liệu cá nhân",
      description: "Xem và tải dữ liệu",
    },
    {
      icon: <Smartphone size={20} color="#2563eb" />,
      title: "Thiết bị",
      description: "Xem thiết bị đăng nhập",
    },
    {
      icon: <Trash2 size={20} color="#2563eb" />,
      title: "Xóa dữ liệu",
      description: "Xóa tài khoản",
    },
  ];

  const privacySettings = [
    {
      title: "Ai có thể tìm tôi?",
      options: ["Mọi người", "Bạn bè", "Không ai"],
    },
    {
      title: "Ai có thể liên hệ?",
      options: ["Mọi người", "Bạn bè", "Không ai"],
    },
    {
      title: "Hồ sơ của tôi?",
      options: ["Công khai", "Riêng tư"],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../assets/myApp/arrow.png")}
            style={styles.titleIcon}
          />
        </Pressable>
        <Text style={styles.title}>Quyền riêng tư</Text>
      </View>

      {/* BANNER */}
      <View style={styles.banner}>
        <Shield size={28} color="#2563eb" />
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Bảo vệ quyền riêng tư của bạn</Text>
          <Text style={styles.bannerDesc}>
            Bạn luôn có quyền kiểm soát dữ liệu của mình
          </Text>
        </View>
      </View>

      {/* FEATURES */}
      <Text style={styles.section}>Công cụ</Text>
      <View style={styles.grid}>
        {privacyFeatures.map((item, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.icon}>{item.icon}</View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        ))}
      </View>

      {/* SETTINGS */}
      <Text style={styles.section}>Cài đặt</Text>
      {privacySettings.map((s, i) => (
        <View key={i} style={styles.settingCard}>
          <Text style={styles.settingTitle}>{s.title}</Text>

          <View style={styles.optionRow}>
            {s.options.map((opt, idx) => (
              <Pressable
                key={idx}
                style={[styles.optionBtn, idx === 0 && styles.optionActive]}
              >
                <Text
                  style={[styles.optionText, idx === 0 && { color: "#2563eb" }]}
                >
                  {opt}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}

      {/* RIGHTS */}
      <View style={styles.rights}>
        <Settings size={20} />
        <Text style={styles.rightsTitle}>Quyền của bạn</Text>

        <Text style={styles.rightItem}>• Xem dữ liệu</Text>
        <Text style={styles.rightItem}>• Chỉnh sửa dữ liệu</Text>
        <Text style={styles.rightItem}>• Xóa dữ liệu</Text>
        <Text style={styles.rightItem}>• Từ chối xử lý</Text>
      </View>

      {/* CONTACT */}
      <View style={styles.contact}>
        <Text style={{ fontWeight: "600" }}>Cần hỗ trợ?</Text>
        <Text style={{ color: "#666" }}>support@skillsnap.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
    paddingTop: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  back: { fontSize: 20, marginRight: 10 },
  title: { fontSize: 20, fontWeight: "bold" },

  banner: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#dbeafe",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  bannerTitle: { fontWeight: "bold" },
  bannerDesc: { fontSize: 12 },

  section: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },

  icon: { marginBottom: 6 },

  cardTitle: { fontWeight: "600" },
  desc: { fontSize: 12, color: "#666" },

  settingCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  settingTitle: { fontWeight: "600", marginBottom: 6 },

  optionRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },

  optionBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  optionActive: {
    borderColor: "#2563eb",
    backgroundColor: "#e0f2fe",
  },

  optionText: { fontSize: 12 },

  rights: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  rightsTitle: { fontWeight: "600", marginVertical: 6 },
  rightItem: { fontSize: 12, color: "#444" },

  contact: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 100,
  },
  titleIcon: {
    width: 24,
    height: 24,
  },
});
