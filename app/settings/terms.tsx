import { useRouter } from "expo-router";
import {
    AlertCircle,
    CheckCircle,
    FileText,
    Shield,
    Users,
    Zap,
} from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function TermsScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(1);

  const sections = [
    {
      id: 1,
      title: "Điều khoản Dịch vụ",
      icon: <FileText size={18} color="#2563eb" />,
      content: "Bạn đồng ý tuân thủ các điều khoản khi sử dụng SkillSnap...",
    },
    {
      id: 2,
      title: "Chính sách Bảo mật",
      icon: <Shield size={18} color="#2563eb" />,
      content: "Chúng tôi thu thập và bảo vệ dữ liệu của bạn...",
    },
    {
      id: 3,
      title: "Nội dung Người dùng",
      icon: <Users size={18} color="#2563eb" />,
      content: "Bạn chịu trách nhiệm với nội dung bạn đăng...",
    },
    {
      id: 4,
      title: "Hoàn tiền & Hủy",
      icon: <Zap size={18} color="#2563eb" />,
      content: "Bạn có thể hủy dịch vụ bất cứ lúc nào...",
    },
    {
      id: 5,
      title: "Khước từ trách nhiệm",
      icon: <AlertCircle size={18} color="#2563eb" />,
      content: "Dịch vụ được cung cấp như hiện tại...",
    },
  ];

  const legalInfo = [
    {
      title: "Thay đổi điều khoản",
      desc: "SkillSnap có thể thay đổi bất cứ lúc nào",
    },
    {
      title: "Pháp luật áp dụng",
      desc: "Theo luật Việt Nam",
    },
    {
      title: "Liên hệ",
      desc: "legal@skillsnap.com",
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
        <Text style={styles.title}>Điều khoản</Text>
      </View>

      {/* INTRO */}
      <View style={styles.intro}>
        <Text style={styles.introTitle}>Vui lòng đọc kỹ điều khoản</Text>
        <Text style={styles.introDesc}>
          Khi sử dụng SkillSnap bạn đồng ý với các chính sách này
        </Text>
      </View>

      {/* SECTIONS */}
      {sections.map((item) => (
        <View key={item.id} style={styles.card}>
          <Pressable
            onPress={() => setExpanded(expanded === item.id ? null : item.id)}
            style={styles.cardHeader}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              {item.icon}
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>

            <Text>{expanded === item.id ? "▲" : "▼"}</Text>
          </Pressable>

          {expanded === item.id && (
            <Text style={styles.content}>{item.content}</Text>
          )}
        </View>
      ))}

      {/* LEGAL */}
      <Text style={styles.section}>Thông tin khác</Text>
      {legalInfo.map((l, i) => (
        <View key={i} style={styles.card}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <CheckCircle size={16} color="green" />
            <View>
              <Text style={styles.cardTitle}>{l.title}</Text>
              <Text style={styles.content}>{l.desc}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={{ fontSize: 12 }}>Cập nhật: 04/2026</Text>
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

  intro: {
    backgroundColor: "#dbeafe",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  introTitle: { fontWeight: "bold" },
  introDesc: { fontSize: 12 },

  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: { fontWeight: "600" },

  content: { fontSize: 12, color: "#555", marginTop: 6 },

  section: { fontWeight: "bold", marginTop: 10 },

  footer: { alignItems: "center", marginTop: 20 },
  titleIcon: {
    width: 24,
    height: 24,
  },
});
