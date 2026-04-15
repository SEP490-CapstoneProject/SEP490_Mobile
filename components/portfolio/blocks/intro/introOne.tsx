import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";

export default function IntroOne({ data, rank }: { data: any; rank?: number }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        {Number(rank) >= 1 && Number(rank) <= 10 ? (
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
        <Text style={styles.title}>{data?.studyField}</Text>
        <Text style={styles.description}>{data?.description}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingBottom: 10,
          paddingTop: 15,
          gap: 15,
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
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  avata: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginHorizontal: 10,
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
