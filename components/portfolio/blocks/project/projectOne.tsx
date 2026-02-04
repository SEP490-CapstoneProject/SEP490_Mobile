import ProjectLinks from "@/components/ProjectLinks";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type ProjectLink = {
  type: string;
  link: string;
};

type ProjectItem = {
  image: string;
  name: string;
  description: string;
  role: string;
  technology: string;
  links: ProjectLink[];
};

export default function ProjectOne({ data }: { data: ProjectItem[] }) {
  return (
    <View style={styles.container}>
      {/** title */}
      <View style={styles.titleContainer}>
        <View style={styles.backgroundIcon}>
          <Image
            source={require("../../../../assets/portfolio/start-up.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Dự án nổi bật</Text>
      </View>
      {/** content */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.contentContainer}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.content}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.body}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.roleAndTechnology}>Vai trò: {item.role}</Text>
              <Text style={styles.roleAndTechnology}>
                Công nghệ: {item.technology}
              </Text>
            </View>
            <View style={styles.link}>
              <ProjectLinks links={item.links} />
            </View>
          </View>
        ))}
      </ScrollView>
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
    width: 260,
    marginRight: 10,
    borderRadius: 10,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  description: {
    fontSize: 14.5,
    lineHeight: 19,
    paddingTop: 5,
  },
  roleAndTechnology: {
    fontSize: 14.5,
    lineHeight: 19,
    paddingTop: 5,
    color: "#6B7280",
  },
  link: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  body: {
    flex: 1,
    paddingTop: 5,
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
});
