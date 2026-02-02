import { StyleSheet, Text, View } from "react-native";

type referenceItem = {
  name: string;
  position: string;
  mail: string;
  phone: string;
};

export default function ReferenceOne({ data }: { data: referenceItem[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Người giới thiệu</Text>

        {data.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.position}>{item.position}</Text>
            <Text style={styles.mail}>{item.mail}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
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

  card: {
    backgroundColor: "#F1F7FF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  item: {
    alignItems: "center",
    marginTop: 18,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },

  position: {
    fontSize: 14.5,
    color: "#6B7280",
    marginBottom: 2,
    textAlign: "center",
  },

  mail: {
    fontSize: 14.5,
    color: "#6B7280",
    marginBottom: 2,
  },

  phone: {
    fontSize: 14,
    color: "#6B7280",
  },
});
