import { StyleSheet, Text, View } from "react-native";

export default function CommunityNotification() {
  return (
    <View style={styles.container}>
      <Text>Community Notification Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
