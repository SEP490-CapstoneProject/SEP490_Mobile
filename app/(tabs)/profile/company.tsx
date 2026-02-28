import CardButton from "@/components/CardButton";
import ProfilePage from "@/components/profile/ProfilePage";
import { getAuth } from "@/services/auth.api";
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

export default function CompanyProfile() {
  const router = useRouter();
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    getAuth().then(setCompany);
  }, []);

  if (!company) return null;

  return (
    <ProfilePage>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <Image
            source={{ uri: company.coverImage }}
            style={styles.coverImage}
          />
          <Image source={{ uri: company.avatar }} style={styles.avata} />
          <View
            style={{
              marginLeft: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Text style={styles.name}>{company.companyName}</Text>
            <Pressable style={styles.bntEdit} onPress={() => router.push("/")}>
              <Image
                source={require("../../../assets/myApp/edit.png")}
                style={styles.iconEdit}
              />
            </Pressable>
          </View>
        </View>
        {/* Thông tin chi tiết của công ty */}
        <View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginHorizontal: 14,
              marginBottom: 10,
            }}
          >
            <View style={styles.flex}>
              <Text style={{ fontWeight: "bold", fontSize: 14.5 }}>
                Lĩnh vực:
              </Text>
              <Text style={styles.text}>{company.activityField}</Text>
            </View>
            <View style={styles.flex}>
              <Image
                source={require("../../../assets/myApp/maps-and-flags1.png")}
                style={{ width: 14, height: 14, tintColor: "#000000" }}
              />
              <Text style={styles.text}>{company.address}</Text>
            </View>
          </View>
          <Text style={styles.description}>{company.description}</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              marginHorizontal: 15,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <CardButton
              icon={require("../../../assets/myApp/manageprofile.png")}
              title="Đăng tuyển dụng"
              subtitle="Đăng tuyển, tìm kiếm ứng viên"
              onPress={() =>
                router.push("/(tabs)/profile/user/portfolioManager")
              }
            />

            <CardButton
              icon={require("../../../assets/myApp/communitypost.png")}
              title="Bài đăng cộng đồng"
              subtitle="Hoạt động cộng đồng"
              onPress={() =>
                router.push("/(tabs)/profile/user/communityManager")
              }
            />

            <CardButton
              icon={require("../../../assets/myApp/statistics.png")}
              title="Dữ liệu hiệu suất"
              subtitle="Thống kê & dữ liệu"
              onPress={() => router.push("/")}
            />

            <CardButton
              icon={require("../../../assets/myApp/save.png")}
              title="Quan tâm"
              subtitle="Danh sách đã lưu"
              onPress={() => router.push("/")}
            />
          </View>
          <Pressable style={styles.premiumBnt}>
            <View style={styles.iconPremiumLeft}>
              <Image
                source={require("../../../assets/myApp/badge.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>

            <View>
              <Text style={styles.textPremium}>Gói Premium của tôi</Text>
              <Text style={styles.textPremiumSub}>
                Nâng cấp để mở khóa thêm các tính năng
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </ProfilePage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  coverImage: {
    width: "100%",
    height: 190,
  },
  avata: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginTop: -40,
    marginLeft: 20,
  },
  name: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 5,
  },
  bntEdit: {
    backgroundColor: "#E5E7EB",
    width: 40,
    height: 18,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  iconEdit: {
    width: 14,
    height: 14,
    tintColor: "#000000",
  },
  description: {
    marginHorizontal: 14,
    fontSize: 15,
    lineHeight: 19.5,
  },
  text: {
    fontSize: 15,
    lineHeight: 19.5,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  premiumBnt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 30,
  },
  iconPremiumLeft: {
    backgroundColor: "#EFF6FF",
    padding: 10,
    borderRadius: 10,
  },
  textPremium: {
    fontSize: 16,
    fontWeight: "600",
  },
  textPremiumSub: {
    fontSize: 13,
    color: "#6B7280",
  },
});
