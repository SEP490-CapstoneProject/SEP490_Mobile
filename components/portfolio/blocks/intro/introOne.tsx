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
    borderRadius: 28,
    paddingVertical: 10,

    marginTop: 20,
  },

  avata: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },

  name: {
    fontSize: 24,
    fontWeight: "800",
    paddingTop: 14,
    color: "#0F172A",
    letterSpacing: 0.3,
  },

  title: {
    color: "#2563EB",
    fontSize: 15,
    paddingTop: 6,
    paddingBottom: 14,
    fontWeight: "700",
  },

  description: {
    fontSize: 14.5,
    lineHeight: 24,
    marginHorizontal: 10,
    color: "#475569",
    textAlign: "center",
  },

  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,

    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,

    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  icon: {
    width: 16,
    height: 16,
    tintColor: "#2563EB",
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },

  avatarBorder: {
    padding: 5,
    borderRadius: 999,

    shadowColor: "#FF8A00",
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,
  },

  rankCircle: {
    position: "absolute",
    right: -8,
    bottom: -2,

    minWidth: 36,
    height: 36,

    backgroundColor: "#FF3B30",

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 999,

    borderWidth: 3,
    borderColor: "#fff",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,
  },

  rankCircleText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },
});
