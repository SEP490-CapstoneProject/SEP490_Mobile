import { Image, StyleSheet, Text, View } from "react-native";

export default function IntroTwo({ data }: { data: any }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data?.avatar }} style={styles.avata} />
      <View>
        <Text style={styles.name}>{data?.name}</Text>
        <Text style={styles.studyField}>{data?.studyField}</Text>
        <Text style={styles.text}>
          Sinh viên năm {data?.schoolYear} - {data?.school}
        </Text>
        <Text style={styles.text}>{data?.department}</Text>
        <View style={styles.flex}>
          <Image
            source={require("../../../../assets/portfolio/mail1.png")}
            style={styles.icon}
          />
          <Text style={[styles.text, { color: "#6B7280" }]}>{data?.email}</Text>
        </View>
        <View style={styles.flex}>
          <Image
            source={require("../../../../assets/portfolio/phone-call.png")}
            style={styles.icon}
          />
          <Text style={[styles.text, { color: "#6B7280" }]}>{data?.phone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 15,
    width: "55%",
    marginHorizontal: 15,
    alignItems: "center",
  },
  avata: {
    width: 120,
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  studyField: {
    fontSize: 14.5,
    color: "#3B82F6",
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 14.5,
    marginBottom: 4,
  },
  flex: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  icon: {
    width: 15,
    height: 15,
  },
});
