import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";

export default function IntroFour({
  data,
  rank,
}: {
  data: any;
  rank?: number;
}) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        {typeof rank === "number" && rank >= 1 && rank <= 10 ? (
          <View style={styles.avatarWrapper}>
            <LinearGradient
              colors={["#FF7A00", "#FFD700", "#FF2D2D"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarBorder}
            >
              <Image source={{ uri: data?.avatar }} style={styles.avata} />
            </LinearGradient>
            <View style={styles.rankCircle}>
              <Text style={styles.rankCircleText}>#{rank}</Text>
            </View>
          </View>
        ) : (
          <Image source={{ uri: data?.avatar }} style={styles.avata} />
        )}
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
  avatarWrapper: {
    position: "relative",
    marginBottom: 10,
  },

  avatarBorder: {
    padding: 4,
    borderRadius: 60,
    backgroundColor: "#FF5F00",
    shadowColor: "#FF5F00",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },

  rankCircle: {
    position: "absolute",
    right: -5,
    bottom: -5,

    backgroundColor: "#FF2D2D",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,

    borderWidth: 2,
    borderColor: "#fff",

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },

  rankCircleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
