import CustomLoading from "@/components/CustomLoading";
import { fetchSavedJobs } from "@/services/careManagement.api";
import { shareContent } from "@/services/share";
import { LinearGradient } from "expo-linear-gradient";
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
  const [jobs, setJobs] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setLoading(true);
    const loadSaved = async () => {
      const data = await fetchSavedJobs();
      setJobs(data);
      setLoading(false);
    };

    loadSaved();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <CustomLoading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {jobs.map((job, index) => (
            <View key={job.postId} style={styles.contentcontainer}>
              {job.mediaType === "image" ? (
                <Image
                  source={{ uri: job.mediaUrl }}
                  style={styles.media}
                  resizeMode="cover"
                />
              ) : (
                <></>
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
                <View style={{ flexDirection: "row", gap: 10, flex: 1 }}>
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
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.contentLeft}
                      >
                        {job.address}
                      </Text>
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
                      <Text style={styles.contentLeft}>
                        {job.employmentType}
                      </Text>
                    </View>
                    <Pressable
                      style={styles.letDetail}
                      onPress={() =>
                        router.push({
                          pathname: `/(tabs)/home/detail`,
                          params: { postId: job.postId },
                        })
                      }
                    >
                      <Text style={{ color: "#FFFFFF", fontSize: 11 }}>
                        Xem chi tiết
                      </Text>
                      <Image
                        source={require("../../../../../assets/myApp/upper-right-arrow.png")}
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
                  <Pressable>
                    <Image
                      source={require("../../../../../assets/myApp/bookmark.png")}
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
                      source={require("../../../../../assets/myApp/share-.png")}
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
    bottom: -40,
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
