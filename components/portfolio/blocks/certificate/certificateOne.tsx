import {
    Image,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type cetificateItem = {
  name: string;
  issuer: string;
  year: string;
  link: string;
};

export default function CertificateOne({ data }: { data: cetificateItem[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/certificate.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Chứng chỉ</Text>
      </View>
      {/** content */}
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{ flexDirection: "row", paddingVertical: 8 }}>
              <Text style={styles.text}>{item.issuer}</Text>
              <Text style={styles.text}>, cấp năm: {item.year}</Text>
            </View>
            <Pressable onPress={() => Linking.openURL(item.link)}>
              <Text style={styles.link}>Xem chứng chỉ</Text>
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
  },
  content: {
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14.5,
    color: "#6B7280",
  },
  link: {
    color: "#2563EB",
    fontSize: 14.5,
    alignSelf: "flex-end",
    paddingRight: 10,
  },
});
