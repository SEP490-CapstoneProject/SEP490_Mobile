import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type item = {
  schoolName: string;
  time: string;
  description: string;
  link: string;
};

export default function ResearchOne({ data }: { data: item[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/flask.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Công bố khoa học</Text>
      </View>
      {/** content */}
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <Text style={styles.name}>{item.schoolName}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.line} />
            <Pressable
              onPress={() => Linking.openURL(item.link)}
              style={styles.link}
            >
              <Text style={{ color: "#3B82F6" }}>Xem công bố</Text>
            </Pressable>
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
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B82F6",
    marginVertical: 3,
  },
  description: {
    fontSize: 14.5,
    color: "#6B7280",
    lineHeight: 19,
  },
  line: {
    backgroundColor: "#E2E8F0",
    height: 1.5,
    width: "auto",
    marginHorizontal: 8,
    marginVertical: 10,
  },
  link: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },
});
