import CardButton from "@/components/CardButton";
import PortfolioRenderer from "@/components/portfolio/render/portfolioRenderer";
import ProfilePage from "@/components/profile/ProfilePage";
import { getAuth } from "@/services/auth.api";
import { fetchMainBlockPortfolioByUserId } from "@/services/portfolio.api";
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

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    getAuth().then(setUser);
  }, []);

  useEffect(() => {
    if (!user?.userId) return;
    fetchMainBlockPortfolioByUserId(user.userId).then(setPortfolio);
  }, [user]);

  if (!user) return null;

  return (
    <ProfilePage>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={{ uri: user.coverImage }} style={styles.coverImage} />
          <Image source={{ uri: user.avatar }} style={styles.avata} />
          <View
            style={{
              marginLeft: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Text style={styles.name}>{user.name}</Text>
            <Pressable
              style={styles.bntEdit}
              onPress={() => router.push("../profile/editProfile/user")}
            >
              <Image
                source={require("../../../assets/myApp/edit.png")}
                style={styles.iconEdit}
              />
            </Pressable>
          </View>
        </View>
        {/* portfolio here */}
        <View style={{ marginTop: 30 }}>
          <View style={styles.pressableBnt}>
            <Pressable style={styles.pressableShare}>
              <Text style={styles.textShare}>chia sẻ hồ sơ</Text>
            </Pressable>
            <Pressable style={styles.pressableOption}>
              <Image
                source={require("../../../assets/myApp/option.png")}
                style={{ width: 25, height: 25 }}
              />
            </Pressable>
          </View>
          <View>
            {portfolio?.blocks && (
              <PortfolioRenderer blocks={[portfolio.blocks]} />
            )}
          </View>
        </View>
        {/* button */}
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
              title="Quản lý hồ sơ"
              subtitle="Quản lý & cập nhật hồ sơ của bạn"
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
  textShare: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  pressableShare: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 70,
    paddingVertical: 6,
    borderRadius: 10,
  },
  pressableOption: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 30,
    paddingVertical: 4.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  pressableBnt: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
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
