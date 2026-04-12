import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function CustomLoading() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(-40)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(progressAnim, {
        toValue: width,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#f8fafd", "#eef2ff"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.logoWrapper}>
        <Animated.View
          style={[
            styles.spinner,
            {
              transform: [{ rotate }],
            },
          ]}
        />

        <View style={styles.iconWrapper}>
          <Svg width={40} height={40} viewBox="0 0 24 24">
            <Path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      </View>

      {/* TEXT */}
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>
          Skill<Text style={{ color: "#2563eb" }}>Snap</Text>
        </Text>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                transform: [{ translateX: progressAnim }],
              },
            ]}
          />
        </View>

        <Text style={styles.subtitle}>
          Nâng tầm kỹ năng, Chạm tới tương lai
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafd",
    alignItems: "center",
    justifyContent: "center",
  },

  logoWrapper: {
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  spinner: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#e2e8f0",
    borderTopColor: "#2563eb",
  },

  iconWrapper: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 4,
    color: "#1e293b",
  },

  subtitle: {
    marginTop: 15,
    fontSize: 11,
    color: "#94a3b8",
    letterSpacing: 2,
    fontStyle: "italic",
  },

  progressContainer: {
    width: 160,
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 15,
  },

  progressBar: {
    width: 60,
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 10,
  },
});
