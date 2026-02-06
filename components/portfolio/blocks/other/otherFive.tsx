import { Image, StyleSheet, Text, View } from "react-native";

type Item = {
  name: string;
};

export default function OtherFive({ data }: { data: Item[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/research-paper.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Lĩnh vực nghiên cứu</Text>
      </View>
      {/** content */}
      <View style={styles.skillList}>
        {data.map((item, index) => (
          <View key={index} style={styles.skillChip}>
            <Text style={styles.skillText}>{item.name}</Text>
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
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  skillChip: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  skillText: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "500",
  },
});
