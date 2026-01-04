import { JobDetail, fetchJobById } from "@/services/home.api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Detail() {
  const { postId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [jobDetail, setJobDetail] = useState<JobDetail | null>(null);

  useEffect(() => {
    const loadJobDetail = async () => {
      try {
        setLoading(true);
        if (typeof postId === "string") {
          const fetchedJobDetail = await fetchJobById(Number(postId));
          setJobDetail(fetchedJobDetail);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadJobDetail();
  }, [postId]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: jobDetail?.mediaUrl }}
        style={{ width: "100%", height: 250 }}
      />
      <View style={styles.iconContainer}>
        <View style={styles.iconLeft}>
          <View style={styles.backgroundIcon}>
            <Image
              source={require("../../../assets/myApp/arrow.png")}
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.iconRight}>
          <View style={styles.backgroundIcon}>
            <Image
              source={require("../../../assets/myApp/heartA (1).png")}
              style={styles.icon}
            />
          </View>
          <View style={styles.backgroundIcon}>
            <Image
              source={require("../../../assets/myApp/share_black.png")}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
      <View style={styles.headerContent}>
        <Image
          source={{ uri: jobDetail?.companyAvatar }}
          style={styles.avata}
        />
        <View style={styles.positionContainer}>
          <Text style={styles.label}>{jobDetail?.position}</Text>
          <View style={styles.contentContainer}>
            <Image
              source={require("../../../assets/myApp/checklist.png")}
              style={styles.checkList}
            />
            <Text style={styles.companyName}>{jobDetail?.companyName}</Text>
          </View>
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <View style={styles.contentContainer}>
            <Image
              source={require("../../../assets/myApp/maps-and-flags1.png")}
              style={styles.locationIcon}
            />
            <Text style={styles.textContent}>{jobDetail?.address}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 20, marginTop: 10}}>
            <View style={styles.contentContainer}>
              <Image
                source={require("../../../assets/myApp/money1.png")}
                style={styles.locationIcon}
              />
              <Text style={styles.textContent}>{jobDetail?.salary}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Image
                source={require("../../../assets/myApp/clock.png")}
                style={styles.locationIcon}
              />
                <Text style={styles.textContent}>{jobDetail?.employmentType}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 20, marginTop: 10}}>
            <View style={styles.contentContainer}>
              <Image
                source={require("../../../assets/myApp/star.png")}
                style={styles.locationIcon}
              />
                <Text style={styles.textContent}>+{jobDetail?.experienceYear} Năm kinh nghiệm</Text>
            </View>
            <View style={styles.contentContainer}>
              <Image
                source={require("../../../assets/myApp/group1.png")}
                style={styles.locationIcon}
              />
                <Text style={styles.textContent}>{jobDetail?.quantity} Ứng viên</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  backgroundIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconRight: {
    right: 10,
    top: 10,
    flexDirection: "row",
    gap: 25,
  },
  iconLeft: {
    left: 10,
    top: 10,
  },
  headerContent: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "85%",
    paddingBottom: 40,
    borderRadius: 16,
    top: 150,
    alignSelf: "center",
  },
  avata: {
    position: "absolute",
    top: -35,
    width: 70,
    height: 70,
    borderRadius: 38,
    alignSelf: "center",
  },
  positionContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 5,
  },
  checkList: {
    width: 16,
    height: 16,
  },
  companyName: {
    fontSize: 14,
    color: "#3B82F6",
  },
  locationIcon: {
    width: 20,
    height: 20,
  },
  textContent: {
    color: "#6B7280",
  },
});
