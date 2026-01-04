import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Detail() {
    const { postId } = useLocalSearchParams();
    return (
    <View style={styles.container}>
      <Text>{postId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    },
});