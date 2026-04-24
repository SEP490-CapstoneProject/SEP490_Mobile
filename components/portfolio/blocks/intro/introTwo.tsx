import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";

export default function IntroTwo({ data, rank }: { data: any; rank?: number }) {
  return (
    <View style={styles.container}>
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
  avatarWrapper: {
    position: "relative",
    marginBottom: 10,
  },

  avatarBorder: {
    padding: 4,
    borderRadius: 10,
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
