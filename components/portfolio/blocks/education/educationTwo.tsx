import { Image, StyleSheet, Text, View } from "react-native";

type educationItem = {
  time: string;
  gpa: string;
  qualified: string;
  description: string;
};

export default function EducationTwo({ data }: { data: educationItem[] }) {
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
        <Text style={styles.title}>Thành tích học tập</Text>
      </View>
      {/** content */}
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <View style={styles.left}>
              <View style={styles.dot} />
              <View style={styles.line} />
            </View>
            <View style={styles.right}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.name}>
                GPA {item.gpa}/4.0 - {item.qualified}
              </Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
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
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
    marginTop: 5,
    alignItems: "flex-start",
  },
  left: {
    alignItems: "center",
    marginTop: 4,
  },
  dot: {
    backgroundColor: "#3B82F6",
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: "#93C5FD",
    marginTop: 2,
  },
  right: {
    flex: 1,
    paddingBottom: 10,
    paddingRight: 15,
  },

  time: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    paddingVertical: 3,
  },
  description: {
    fontSize: 14.5,
    lineHeight: 19,
    paddingVertical: 3,
  },
});
