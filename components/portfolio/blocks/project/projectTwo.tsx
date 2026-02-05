import {
    Image,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type projectLink = {
  link: string;
};

type projectItem = {
  name: string;
  description: string;
  action: string;
  publisher: string;
  projectLinks: projectLink[];
};

export default function ProjectTwo({ data }: { data: projectItem[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/flask.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Dự án nghiên cứu</Text>
      </View>
      {/** content */}
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <View style={styles.flex}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.backgroundAction}>
                <Text style={styles.action}>{item.action}</Text>
              </View>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.line} />
            <View style={styles.flex}>
              <Text style={styles.publisher}>{item.publisher}</Text>
              {item.projectLinks.map((l, index) => (
                <Pressable
                  key={index}
                  onPress={() => Linking.openURL(l.link)}
                  style={styles.flex}
                >
                  <Image
                    source={require("../../../../assets/portfolio/PDF.png")}
                    style={styles.FDFIcon}
                  />
                  <Text
                    style={{ fontSize: 13, color: "#3B82F6", marginLeft: 4 }}
                  >
                    Xem báo cáo
                  </Text>
                </Pressable>
              ))}
            </View>
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
  FDFIcon: {
    width: 20,
    height: 20,
  },
  content: {
    borderColor: "#E2E8F0",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    maxWidth: 230,
    fontSize: 16,
    fontWeight: "bold",
  },
  backgroundAction: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 10,
    height: 30,
    justifyContent: "center",
    borderRadius: 10,
  },
  action: {
    color: "#3B82F6",
  },
  description: {
    fontSize: 14.5,
    marginVertical: 5,
    lineHeight: 19,
  },
  line: {
    backgroundColor: "#E2E8F0",
    height: 2,
    width: "auto",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  publisher: {
    maxWidth: 230,
    fontSize: 14.5,
    color: "#6B7280",
  },
});
