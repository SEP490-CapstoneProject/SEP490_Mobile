import { Job } from "@/services/home.api";
import { fetchCompanyJobPostByPostId } from "@/services/post.api";
import { ResizeMode, Video } from "expo-av";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
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

export default function PostView() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { postId } = useLocalSearchParams();

  // refs cho video
  const videoRefs = useRef<(Video | null)[]>([]);

  // FETCH DATA

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const fetchedJobs = await fetchCompanyJobPostByPostId(Number(postId));
        if (fetchedJobs) {
          setJobs([fetchedJobs]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (postId) loadJobs();
  }, [postId]);

  const onScrollEnd = async (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);

    videoRefs.current.forEach(async (video, i) => {
      if (!video) return;

      if (i === index) {
        await video.playAsync();
      } else {
        await video.pauseAsync();
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      const playCurrentVideo = async () => {
        const video = videoRefs.current[activeIndex];
        if (video) {
          await video.playAsync();
        }
      };
      playCurrentVideo();
      return () => {
        videoRefs.current.forEach(async (video) => {
          if (video) await video.pauseAsync();
        });
      };
    }, [activeIndex]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../../assets/myApp/arrow.png")}
            style={styles.iconBack}
          />
        </Pressable>
        <Pressable>
          <Image
            source={require("../../../../assets/myApp/edit.png")}
            style={styles.iconEdit}
          />
        </Pressable>
      </View>

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
                  shouldPlay={index === activeIndex}
                  isLooping
                  isMuted={false}
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
                        source={require("../../../../assets/myApp/maps-and-flags1.png")}
                        style={styles.iconLefft}
                      />
                      <Text style={styles.contentLeft}>{job.address}</Text>
                    </View>
                    <View>
                      <Image
                        source={require("../../../../assets/myApp/money1.png")}
                        style={styles.iconLefft}
                      />
                      <Text style={styles.contentLeft}>{job.salary}</Text>
                    </View>
                    <View>
                      <Image
                        source={require("../../../../assets/myApp/clock.png")}
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
                          pathname: "/profile/company/postDetail",
                          params: { postId: job.postId },
                        })
                      }
                    >
                      <Text style={{ color: "#FFFFFF" }}>Xem chi tiết</Text>
                      <Image
                        source={require("../../../../assets/myApp/upper-right-arrow.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </Pressable>
                  </View>
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

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  iconBack: {
    width: 24,
    height: 24,
  },

  iconEdit: {
    width: 24,
    height: 24,
    marginLeft: 20,
    tintColor: "#3B82F6",
    marginRight: 10,
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
    width: 55,
    height: 55,
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
});
