import { Image, StyleSheet, Text, View } from "react-native";

export default function ResearchOne({ data }: { data: any }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/flask.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>research</Text>
      </View>
      {/** content */}
      <View style={styles.contentContainer}></View>
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
});
