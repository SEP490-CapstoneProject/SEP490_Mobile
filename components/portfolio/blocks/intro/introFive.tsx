import { Image, StyleSheet, Text, View } from "react-native";

export default function IntroFive({ data }: { data: any }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data?.avatar }} style={styles.avata} />
      <View>
        <Text style={styles.name}>{data?.name}</Text>
        <Text style={styles.studyField}>{data?.studyField}</Text>
        <Text style={styles.experience}>
          {data?.experience} năm kinh nghiệm
        </Text>
        <Text style={styles.text}>
          {data?.department} - {data?.school}
        </Text>
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
    lineHeight: 19,
  },
  flex: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  experience: {
    fontSize: 14.5,
    fontWeight: "bold",
    marginBottom: 3,
  },
});
