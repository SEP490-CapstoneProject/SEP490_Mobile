import { Redirect } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Notification() {
  return (
    <View style={styles.container}>
      <Redirect href="/(tabs)/notification/system" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
});
