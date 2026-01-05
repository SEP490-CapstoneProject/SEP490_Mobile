import { Dimensions, Image, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const GAP = 2;
const CONTAINER_WIDTH = width - 32;

type Props = {
  media: string[];
};

export default function MediaGrid({ media }: Props) {
  const count = media.length;

  if (count === 0) return null;

  // 1 ảnh
  if (count === 1) {
    return (
      <Image
        source={{ uri: media[0] }}
        style={styles.one}
      />
    );
  }

  // 2 ảnh – chia đôi
  if (count === 2) {
    return (
      <View style={styles.row}>
        {media.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.two} />
        ))}
      </View>
    );
  }

  // 3 ảnh – trên 2, dưới 1
  if (count === 3) {
    return (
      <View>
        <View style={styles.row}>
          <Image source={{ uri: media[0] }} style={styles.two} />
          <Image source={{ uri: media[1] }} style={styles.two} />
        </View>
        <Image source={{ uri: media[2] }} style={styles.one} />
      </View>
    );
  }

  // 4 ảnh – grid 2x2
  return (
    <View>
      <View style={styles.row}>
        <Image source={{ uri: media[0] }} style={styles.two} />
        <Image source={{ uri: media[1] }} style={styles.two} />
      </View>
      <View style={styles.row}>
        <Image source={{ uri: media[2] }} style={styles.two} />
        <Image source={{ uri: media[3] }} style={styles.two} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: GAP,
    marginBottom: GAP,
  },

  one: {
    width: CONTAINER_WIDTH,
    height: 220,
    borderRadius: 10,
    marginBottom: GAP,
  },

  two: {
    width: (CONTAINER_WIDTH - GAP) / 2,
    height: 160,
    borderRadius: 10,
  },
});
