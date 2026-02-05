import { Image, StyleSheet, Text, View } from "react-native";

export default function OtherThree({ data }: { data: any }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/human-brain.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Tầm nhìn & động lực</Text>
      </View>
      <Text style={styles.detail}>{data?.detail}</Text>
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
  detail: {
    fontSize: 15,
    lineHeight: 19,
    marginTop: 10,
  },
});
