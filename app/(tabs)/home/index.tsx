import { fetchJobs, Job } from "@/services/home.api";
import { ResizeMode, Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // refs cho video
  const videoRefs = useRef<(Video | null)[]>([]);

  /* ======================
     FETCH DATA
     ====================== */
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  /* ======================
     PLAY / PAUSE VIDEO
     ====================== */
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.playAsync();
      } else {
        video.pauseAsync();
      }
    });
  }, [activeIndex]);

  /* ======================
     SCROLL END → SET INDEX
     ====================== */
  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Khám phá</Text>

      {loading ? (
        <Text style={{ textAlign: "center" }}>Loading...</Text>
      ) : (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
        >
          {jobs.map((job, index) => (
            <View key={job.postId} style={styles.contentcontainer}>
              {job.mediaType === "image" ? (
                <Image
                  source={{ uri: job.mediaUrl }}
                  style={styles.media}
                  resizeMode="contain"
                />
              ) : (
                <Video
                  ref={(ref) => {
                    videoRefs.current[index] = ref;
                  }}
                  source={{ uri: job.mediaUrl }}
                  style={styles.media}
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  shouldPlay={index === 0}
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
                        source={require("../../../assets/myApp/maps-and-flags1.png")}
                        style={styles.iconLefft}
                      />
                      <Text style={styles.contentLeft}>{job.address}</Text>
                    </View>
                    <View>
                      <Image
                        source={require("../../../assets/myApp/money1.png")}
                        style={styles.iconLefft}
                      />
                      <Text style={styles.contentLeft}>{job.salary}</Text>
                    </View>
                    <View>
                      <Image
                        source={require("../../../assets/myApp/clock.png")}
                        style={styles.iconLefft}
                      />
                      <Text style={styles.contentLeft}>
                        {job.employmentType}
                      </Text>
                    </View>
                    <Pressable style={styles.letDetail}>
                      <Text style={{ color: "#FFFFFF" }}>Xem chi tiết</Text>
                      <Image
                        source={require("../../../assets/myApp/upper-right-arrow.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </Pressable>
                  </View>
                </View>
                <View style={{ marginTop: -90 }}>
                  <Image
                    source={require("../../../assets/myApp/like.png")}
                    style={[
                      styles.iconRight,
                      job.isFavorited ? { tintColor: "#FF4848" } : {},
                    ]}
                  />
                  <Image
                    source={require("../../../assets/myApp/connection1.png")}
                    style={styles.iconRight}
                  />
                  <Image
                    source={require("../../../assets/myApp/bookmark.png")}
                    style={[
                      styles.iconRight,
                      job.isSaved ? { tintColor: "#FFD700" } : {},
                    ]}
                  />
                  <Image
                    source={require("../../../assets/myApp/share-.png")}
                    style={styles.iconRight}
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  contentcontainer: {
    width,
    height: height - 180,
    backgroundColor: "#9FAD91",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  content: {
    position: "absolute",
    bottom: 20,
    left: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 25,
  },

  media: {
    width,
    height: height - 180,
  },

  avata: {
    width: 60,
    height: 60,
    borderRadius: 32.5,
  },
  position: {
    color: "#FFFFFF",
    fontSize: 17,
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
    fontSize: 14,
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
    width: 34,
    height: 34,
    marginBottom: 30,
  },
});
