import { useLocalSearchParams } from "expo-router";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function MediaPreview() {
  const { images, index } = useLocalSearchParams();

  const list: string[] = images ? JSON.parse(images as string) : [];

  const startIndex = Math.min(Number(index) || 0, Math.max(list.length - 1, 0));

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={startIndex}
        keyExtractor={(_, i) => i.toString()}
        getItemLayout={(_, i) => ({
          length: width,
          offset: width * i,
          index: i,
        })}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  imageWrapper: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width,
    height,
  },
});
