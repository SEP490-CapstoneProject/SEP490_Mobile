import { Image, StyleSheet, Text, View } from "react-native";

export default function CarePostScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/women/20.jpg",
            }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.name}>Lê Thu Hà</Text>
            <Text style={styles.time}>2 giờ trước</Text>
          </View>
        </View>

        <Text style={styles.content}>
          Hôm nay mình xin chia sẻ công thức làm món sườn xào chua ngọt...
        </Text>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1604908176997-4319e07b4d45",
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  name: {
    fontWeight: "bold",
  },

  time: {
    color: "#64748B",
    fontSize: 12,
  },

  content: {
    marginTop: 10,
  },

  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
