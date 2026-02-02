import { Image, StyleSheet, Text, View } from "react-native";

type activityItem = {
  name: string;
  date: string;
  description: string;
};

export default function ActivityOne({ data }: { data: activityItem[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/unity.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Hoạt động</Text>
      </View>
      {/** content */}
      <View>
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.time}>{item.date}</Text>
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
  content: {
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    color: "#3B82F6",
    fontSize: 14.5,
    paddingBottom: 5,
  },
  description: {
    color: "#6B7280",
    fontSize: 14.5,
    paddingBottom: 5,
    lineHeight: 19,
  },
});
