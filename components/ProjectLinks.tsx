import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

type ProjectLink = {
  type: string;
  link: string;
};

type Props = {
  links: ProjectLink[];
};

export default function ProjectLinks({ links }: Props) {
  return (
    <View style={styles.container}>
      {links.map((item) => (
        <Pressable
          key={item.type}
          style={styles.chip}
          onPress={() => Linking.openURL(item.link)}
        >
          <Text style={styles.text}>{item.type}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 16,
  },
  text: {
    color: "#2563EB",
    fontSize: 12.5,
    fontWeight: "600",
  },
});
