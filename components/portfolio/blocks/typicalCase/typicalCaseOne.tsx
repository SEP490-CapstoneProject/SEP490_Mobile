import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type Item = {
  patient: string;
  age: string;
  caseName: string;
  stage: string;
  regiment: string;
};

export default function TypicalCaseOne({ data }: { data: Item[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/list11.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Trường hợp điển hình</Text>
      </View>
      {/** content */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.contentContainer}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <Text style={styles.name}>
              {item.patient}, {item.age} tuổi
            </Text>
            <Text style={styles.caseName}>{item.caseName}</Text>
            <Text style={styles.txt}>Tình trạng</Text>
            <Text style={styles.stage}>{item.stage}</Text>
            <Text style={styles.txt}>Phác đồ</Text>
            <Text style={styles.stage}>{item.regiment}</Text>
          </View>
        ))}
      </ScrollView>
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
    marginTop: 20,
  },
  content: {
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    width: 260,
    marginRight: 10,
    borderRadius: 10,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19,
  },
  caseName: {
    fontSize: 14.5,
    lineHeight: 19,
    color: "#6B7280",
    marginTop: 3,
  },
  txt: {
    fontSize: 14.5,
    lineHeight: 19,
    fontWeight: "bold",
    marginTop: 13,
  },
  stage: {
    fontSize: 14.5,
    lineHeight: 19,
  },
});
