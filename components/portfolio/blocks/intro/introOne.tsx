import { Image, StyleSheet, Text, View } from "react-native";

export default function IntroOne({ data }: { data: any }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: data?.avatar }} style={styles.avata} />
        <Text style={styles.name}>{data?.fullName}</Text>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.description}>{data?.description}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 15,
          paddingBottom: 10,
          paddingTop: 15,
        }}
      >
        <View style={styles.flex}>
          <Image
            source={require("../../../../assets/portfolio/mail1.png")}
            style={styles.icon}
          />
          <Text style={{ color: "#6B7280" }}>{data?.email}</Text>
        </View>
        <View style={styles.flex}>
          <Image
            source={require("../../../../assets/portfolio/phone-call.png")}
            style={styles.icon}
          />
          <Text style={{ color: "#6B7280" }}>{data?.phone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
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
    color: "#3B82F6",
    fontSize: 15,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14.5,
    lineHeight: 19,
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
