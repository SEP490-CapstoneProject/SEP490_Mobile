import { Image, StyleSheet, Text, View } from "react-native";

type projectItem = {
  name: string;
  publisher: string;
  time: string;
  description: string;
  action: string;
};

export default function ProjectThree({ data }: { data: projectItem[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/start-up.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Dự án & đề tài</Text>
      </View>
      {/** content */}
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <View style={styles.left} />
            <View style={styles.right}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.publisher}>
                Nguồn: {item.publisher}.{item.time}
              </Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.action}>Trạng thái: {item.action}</Text>
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
  right: {
    width: "95%",
    marginTop: 10,
  },
  publisher: {
    fontSize: 14.5,
    lineHeight: 19,
    color: "#6B7280",
    marginVertical: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19,
  },
  description: {
    fontSize: 14.5,
    lineHeight: 19,
    marginVertical: 3,
  },
  action: {
    color: "#3B82F6",
    fontSize: 14.5,
  },
  left: {
    backgroundColor: "#3B82F6",
    width: 2,
    height: "auto",
    marginVertical: 4,
    marginTop: 13,
  },
  content: {
    flexDirection: "row",
    gap: 10,
  },
});
