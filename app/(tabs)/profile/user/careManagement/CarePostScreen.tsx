import { Job } from "@/services/home.api";
import { shareContent } from "@/services/share";
import { fetchSavedJobs } from "@/services/user/careManagement.api";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CarePostScreen() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    fetchSavedJobs().then(setJobs);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {jobs.map((job) => (
          <View key={job.postId} style={styles.card}>
            {/* BACKGROUND IMAGE */}
            {job.mediaType === "image" && (
              <Image source={{ uri: job.mediaUrl }} style={styles.background} />
            )}

            {job.mediaType === "video" && (
              <Video
                source={{ uri: job.mediaUrl }}
                style={styles.background}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
              />
            )}

            <View style={styles.content}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Image
                  source={{ uri: job.companyAvatar }}
                  style={styles.avata}
                />
                <View>
                  <Text style={styles.position}>{job.position}</Text>
                  <Text style={styles.name}>{job.companyName}</Text>

                  <View style={{ marginTop: 17 }}>
                    <Image
                      source={require("../../../../../assets/myApp/maps-and-flags1.png")}
                      style={styles.iconLefft}
                    />
                    <Text style={styles.contentLeft}>{job.address}</Text>
                  </View>
                  <View>
                    <Image
                      source={require("../../../../../assets/myApp/money1.png")}
                      style={styles.iconLefft}
                    />
                    <Text style={styles.contentLeft}>{job.salary}</Text>
                  </View>
                  <View>
                    <Image
                      source={require("../../../../../assets/myApp/clock.png")}
                      style={styles.iconLefft}
                    />
                    <Text style={styles.contentLeft}>{job.employmentType}</Text>
                  </View>
                  <Pressable
                    style={styles.letDetail}
                    onPress={() =>
                      router.push({
                        pathname: "/home/detail",
                        params: { postId: job.postId },
                      })
                    }
                  >
                    <Text style={{ color: "#FFFFFF" }}>Xem chi tiết</Text>
                    <Image
                      source={require("../../../../../assets/myApp/upper-right-arrow.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </Pressable>
                </View>
              </View>
              <View style={{ marginTop: -5 }}>
                <Image
                  source={require("../../../../../assets/myApp/bookmark.png")}
                  style={[
                    styles.iconRight,
                    job.isSaved ? { tintColor: "#FFD700" } : {},
                  ]}
                />
                <Pressable
                  onPress={() =>
                    shareContent(`https://skillsnap.io/job/${job.postId}`)
                  }
                >
                  <Image
                    source={require("../../../../../assets/myApp/share-.png")}
                    style={styles.iconRight}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  card: {
    height: 400,
    borderRadius: 16,
    overflow: "hidden",
    margin: 12,
  },

  background: {
    width: "100%",
    height: "100%",
  },

  content: {
    position: "absolute",
    bottom: 20,
    left: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "93%",
  },

  avata: {
    width: 50,
    height: 50,
    borderRadius: 32.5,
  },
  position: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  iconLefft: {
    width: 16,
    height: 16,
    marginTop: 5,
  },

  contentLeft: {
    color: "#FFFFFF",
    fontSize: 13,
    marginLeft: 20,
    marginTop: -18,
  },

  letDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(226, 232, 240, 0.3)",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 120,
    justifyContent: "space-between",
  },

  iconRight: {
    width: 30,
    height: 30,
    marginBottom: 70,
  },
});
