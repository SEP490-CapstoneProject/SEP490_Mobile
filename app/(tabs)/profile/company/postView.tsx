import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PostView() {
  const router = useRouter();
  const { postId } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>Post View: {postId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
