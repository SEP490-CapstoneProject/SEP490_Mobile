import { Image, StyleSheet, Text, View } from "react-native";

export default function IntroThree({ data }: { data: any }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: data?.avatar }} style={styles.avata} />
        <Text style={styles.name}>{data?.name}</Text>
        <Text style={styles.title}>
          {" "}
          {data?.school} - {data?.department}
        </Text>
        <View style={styles.gpaBackground}>
          <Image
            source={require("../../../../assets/portfolio/star-inside-circle.png")}
            style={styles.icon}
          />
          <Text style={styles.gpa}>GPA {data?.gpa}/4.0</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  avata: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 8,
  },
  title: {
    color: "#111827",
    fontSize: 15,
    paddingBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 19,
  },
  icon: {
    width: 20,
    height: 20,
  },
  gpaBackground: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  gpa: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
