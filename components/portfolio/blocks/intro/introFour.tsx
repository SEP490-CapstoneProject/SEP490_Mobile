import { Image, StyleSheet, Text, View } from "react-native";

export default function IntroFour({ data }: { data: any }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: data?.avatar }} style={styles.avata} />
        <Text style={styles.name}>{data?.name}</Text>
        <Text style={styles.shool}>{data?.school}</Text>
        <Text style={styles.department}>{data?.department}</Text>
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
    width: 120,
    height: 140,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 8,
  },
  shool: {
    fontSize: 14.5,
    color: "#3B82F6",
    fontWeight: "bold",
  },
  department: {
    fontSize: 14.5,
    color: "#6B7280",
    fontWeight: "bold",
    marginTop: 5,
  },
});
