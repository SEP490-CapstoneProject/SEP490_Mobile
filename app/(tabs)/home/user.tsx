import CustomLoading from "@/components/CustomLoading";
import { fetchJobs, saveJob, unSaveJob } from "@/services/home.api";
import { shareContent } from "@/services/share";
import { useJobStore } from "@/utils/jobPostStore";
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const jobs = useJobStore((s) => s.jobs);
  const setJobs = useJobStore((s) => s.setJobs);
  const toggleSave = useJobStore((s) => s.toggleSave);

  // refs cho video
  const videoRefs = useRef<(Video | null)[]>([]);

  // FETCH DATA

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

  // PLAY / PAUSE VIDEO
  useFocusEffect(
    useCallback(() => {
      const playVideo = async () => {
        const video = videoRefs.current[activeIndex];
        if (!video) return;

        setTimeout(async () => {
          try {
            const status = await video.getStatusAsync();

            if (!status?.isLoaded) return;

            await video.setIsMutedAsync(false);
            await video.playAsync();
          } catch {}
        }, 300);
      };

      playVideo();

      return () => {
        videoRefs.current.forEach(async (v) => {
          if (!v) return;

          try {
            const status = await v.getStatusAsync();

            if (!status?.isLoaded) return;

            await v.pauseAsync();
            await v.setIsMutedAsync(true);
          } catch {}
        });
      };
    }, [activeIndex]),
  );

  // SCROLL END → SET INDEX
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / 320); // chiều cao card
    setActiveIndex(index);
  };
  const handleSaveJob = async (postId: number, isSaved: boolean) => {
    toggleSave(postId);

    try {
      if (isSaved) {
        await unSaveJob(postId);
      } else {
        await saveJob(postId);
      }
    } catch (error) {
      console.log("❌ Save lỗi → rollback");
      toggleSave(postId);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <CustomLoading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {jobs.map((job, index) => (
            <View key={job.postId} style={styles.contentcontainer}>
              {job.mediaType === "image" ? (
                <Image
                  source={{ uri: job.mediaUrl }}
                  style={styles.media}
                  resizeMode="cover"
                />
              ) : (
                <Video
                  ref={(ref) => {
                    videoRefs.current[index] = ref;
                  }}
                  source={{ uri: job.mediaUrl }}
                  style={styles.media}
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  isMuted={index !== activeIndex}
                />
              )}
              <LinearGradient
                colors={[
                  "rgba(0,0,0,0)",
                  "rgba(0,0,0,0.3)",
                  "rgba(0,0,0,0.4)",
                  "rgba(0,0,0,0.5)",
                ]}
                style={styles.gradient}
              />
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
                    <Pressable
                      style={styles.letDetail}
                      onPress={() =>
                        router.push({
                          pathname: "../home/detail",
                          params: { postId: job.postId },
                        })
                      }
                    >
                      <Text style={{ color: "#FFFFFF", fontSize: 11 }}>
                        Xem chi tiết
                      </Text>
                      <Image
                        source={require("../../../assets/myApp/upper-right-arrow.png")}
                        style={{ width: 15, height: 15 }}
                      />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{
                    marginRight: 9,
                  }}
                >
                  <Pressable
                    onPress={() => handleSaveJob(job.postId, job.isSaved)}
                  >
                    <Image
                      source={require("../../../assets/myApp/bookmark.png")}
                      style={[
                        styles.iconRight,
                        job.isSaved ? { tintColor: "#FFD700" } : {},
                      ]}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      shareContent(`https://skillsnap.io/job/${job.postId}`)
                    }
                  >
                    <Image
                      source={require("../../../assets/myApp/share-.png")}
                      style={styles.iconRight}
                    />
                  </Pressable>
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
  },
  contentcontainer: {
    width: "94%",
    height: 300,
    backgroundColor: "#EFF6FF",
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
  },

  content: {
    position: "absolute",
    bottom: -45,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  media: {
    width: "100%",
    height: "100%",
  },

  avata: {
    width: 55,
    height: 55,
    borderRadius: 32.5,
    marginLeft: 5,
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
    width: 14,
    height: 14,
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
    width: 100,
    justifyContent: "space-between",
  },

  iconRight: {
    width: 27,
    height: 27,
    marginBottom: 70,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
