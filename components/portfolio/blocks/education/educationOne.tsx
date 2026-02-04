import { Image, StyleSheet, Text, View } from "react-native";

type educationItem = {
  schoolName: string;
  time: string;
  department: string;
  description: string;
};

export default function EducationOne({ data }: { data: educationItem[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/graduation-cap-1.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Học vấn</Text>
      </View>
      {/** content */}
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
              <Text style={styles.shool}>{item.schoolName}</Text>
              <Text style={styles.shool}>({item.time})</Text>
            </View>
            <Text style={styles.major}>{item.department}</Text>
            <Text style={styles.description}>{item.description}</Text>
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

  shool: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    marginBottom: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
  },
  major: {
    fontSize: 14.5,
    fontWeight: "bold",
    color: "#3B82F6",
    paddingVertical: 3,
  },
  description: {
    fontSize: 14.5,
    paddingTop: 3,
    lineHeight: 19,
    color: "#6B7280",
  },
});
