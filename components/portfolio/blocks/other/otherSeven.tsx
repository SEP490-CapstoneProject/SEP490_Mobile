import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type item = {
  name: string;
  detail: string;
};

export default function OtherSeven({ data }: { data: item[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/unity.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Tài liệu bổ sung</Text>
      </View>
      {/** content */}
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <Text style={styles.name}>{item.name}</Text>
            <Pressable onPress={() => Linking.openURL(item.detail)}>
              <Image
                source={require("../../../../assets/portfolio/see.png")}
                style={styles.linkIcon}
              />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  backgroundIcon: {
    backgroundColor: "#3B82F6",
    width: 39,
    height: 39,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    marginTop: 10,
    gap: 10,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderColor: "#3B82F6",
    borderWidth: 1.5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkIcon: {
    width: 20,
    height: 20,
  },
  name: {
    fontSize: 14.5,
    maxWidth: 280,
    lineHeight: 19,
  },
});
