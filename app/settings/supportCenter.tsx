import { useRouter } from "expo-router";
import {
  Clock,
  FileText,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react-native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function SupportCenterScreen() {
  const router = useRouter();

  const faqs = [
    {
      id: 1,
      category: "Tài khoản",
      question: "Làm cách nào để đặt lại mật khẩu của tôi?",
      answer: "Bạn có thể vào Cài đặt → Đổi mật khẩu và làm theo hướng dẫn.",
    },
    {
      id: 2,
      category: "Hồ sơ",
      question: "Làm cách nào để cập nhật hồ sơ?",
      answer: "Vào trang hồ sơ và chọn chỉnh sửa.",
    },
  ];

  const supportChannels = [
    {
      title: "Chat trực tiếp",
      description: "Trò chuyện với hỗ trợ",
      time: "8:00 - 20:00",
      icon: <MessageCircle size={22} color="#2563eb" />,
    },
    {
      title: "Email",
      description: "support@skillsnap.com",
      time: "24h",
      icon: <Mail size={22} color="#2563eb" />,
    },
    {
      title: "Điện thoại",
      description: "1900 1234",
      time: "8:00 - 18:00",
      icon: <Phone size={22} color="#2563eb" />,
    },
    {
      title: "Ticket",
      description: "Tạo yêu cầu hỗ trợ",
      time: "Realtime",
      icon: <FileText size={22} color="#2563eb" />,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../assets/myApp/arrow.png")}
            style={styles.titleIcon}
          />
        </Pressable>
        <Text style={styles.title}>Trung tâm hỗ trợ</Text>
      </View>

      {/* Channels */}
      <Text style={styles.sectionTitle}>Liên hệ</Text>
      <View style={styles.grid}>
        {supportChannels.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.iconBox}>{item.icon}</View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <View style={styles.timeRow}>
              <Clock size={12} color="#999" />
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* FAQ */}
      <Text style={styles.sectionTitle}>FAQ</Text>
      {faqs.map((faq) => (
        <View key={faq.id} style={styles.faqCard}>
          <Text style={styles.category}>{faq.category}</Text>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
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

  back: {
    fontSize: 20,
    marginRight: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  iconBox: {
    backgroundColor: "#e0f2fe",
    padding: 8,
    borderRadius: 8,
    width: 40,
    alignItems: "center",
    marginBottom: 8,
  },

  cardTitle: {
    fontWeight: "bold",
  },

  desc: {
    fontSize: 12,
    color: "#666",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },

  time: {
    fontSize: 11,
    color: "#999",
  },

  faqCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  category: {
    fontSize: 12,
    color: "#2563eb",
    marginBottom: 4,
  },

  question: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  answer: {
    color: "#555",
    fontSize: 13,
  },
  titleIcon: {
    width: 24,
    height: 24,
  },
});
