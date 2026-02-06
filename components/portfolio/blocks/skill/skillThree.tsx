import { Image, StyleSheet, Text, View } from "react-native";

type item = {
  name: string;
  description: string;
};

export default function SkillThree({ data }: { data: item[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/thunder.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Kỹ năng lâm sàng</Text>
      </View>
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View style={styles.content} key={index}>
            <Text style={styles.name}>{item.name}</Text>
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
    borderColor: "#6B7280",
    borderWidth: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  description: {
    fontSize: 14.5,
    lineHeight: 19,
    marginTop: 8,
  },
});
