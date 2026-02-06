import { Image, StyleSheet, Text, View } from "react-native";

type item = {
  subject: string;
  teachingplace: string;
};

export default function TeachingOne({ data }: { data: item[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/school.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Giảng dạy</Text>
      </View>
      {/** content */}
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.teachingplace}>{item.teachingplace}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  backgroundIcon: {
    backgroundColor: "#3B82F6",
    width: 39,
    height: 39,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    marginTop: 10,
  },
  content: {
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    backgroundColor: "#F9FAFB",
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
  },
  subject: {
    fontSize: 16,
    fontWeight: "bold",
  },
  teachingplace: {
    fontSize: 14.5,
    color: "#6B7280",
    marginVertical: 8,
  },
});
