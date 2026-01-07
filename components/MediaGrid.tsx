import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const GAP = 2;
const CONTAINER_WIDTH = width - 32;

type Props = {
  media: string[];
  onRemove?: (index: number) => void; // optional
};

export default function MediaGrid({ media, onRemove }: Props) {
  const count = media.length;

  if (count === 0) return null;

  const RenderImage = ({
    uri,
    index,
    style,
  }: {
    uri: string;
    index: number;
    style: any;
  }) => (
    <View style={[style, styles.wrapper]}>
      <Image source={{ uri }} style={styles.image} />

      {/* onRemove */}
      {onRemove && (
        <Pressable style={styles.removeBtn} onPress={() => onRemove(index)}>
          <Text style={styles.removeText}>✕</Text>
        </Pressable>
      )}
    </View>
  );

  // ===== 1 ẢNH =====
  if (count === 1) {
    return <RenderImage uri={media[0]} index={0} style={styles.one} />;
  }

  // ===== 2 ẢNH =====
  if (count === 2) {
    return (
      <View style={styles.row}>
        {media.map((uri, index) => (
          <RenderImage key={index} uri={uri} index={index} style={styles.two} />
        ))}
      </View>
    );
  }

  // ===== 3 ẢNH =====
  if (count === 3) {
    return (
      <View>
        <View style={styles.row}>
          <RenderImage uri={media[0]} index={0} style={styles.two} />
          <RenderImage uri={media[1]} index={1} style={styles.two} />
        </View>
        <RenderImage uri={media[2]} index={2} style={styles.one} />
      </View>
    );
  }

  // ===== 4 ẢNH =====
  return (
    <View>
      <View style={styles.row}>
        <RenderImage uri={media[0]} index={0} style={styles.two} />
        <RenderImage uri={media[1]} index={1} style={styles.two} />
      </View>
      <View style={styles.row}>
        <RenderImage uri={media[2]} index={2} style={styles.two} />
        <RenderImage uri={media[3]} index={3} style={styles.two} />
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

  wrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  one: {
    width: CONTAINER_WIDTH,
    height: 220,
    marginBottom: GAP,
  },

  two: {
    width: (CONTAINER_WIDTH - GAP) / 2,
    height: 160,
  },

  removeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  removeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
