import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type CardButtonProps = {
  icon: any;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export default function CardButton({
  icon,
  title,
  subtitle,
  onPress,
}: CardButtonProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.textBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#F1F7FF",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 10,
  },
  textBox: {},
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
});
