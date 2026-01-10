import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const sortIcon = require("../../../assets/myApp/sort.png");
const projectImageIcon = require("../../../assets/myApp/projectimage.png");
const likeIcon = require("../../../assets/myApp/like.png");
const saveIcon = require("../../../assets/myApp/save.png");
const shareIcon = require("../../../assets/myApp/share-.png");
const optionIcon = require("../../../assets/myApp/option.png");
const arrowIcon = require("../../../assets/myApp/arrow.png");
export default function CommunityPost() {
  const router = useRouter();

  // Test data - danh sách bài đăng
  const posts = [
    {
      id: 1,
      author: "Phạm Cường",
      time: "30 phút trước",
      description: "Chúng mình đang tìm kiếm Freelancer để tham gia các dự án công nghệ đa dạng (web, mobile, thiết kế, nội dung...).",
      image: projectImageIcon,
      likes: 25,
    },
    {
      id: 2,
      author: "Phạm Cường",
      time: "1 giờ trước",
      description: "Tìm kiếm developer React Native có kinh nghiệm cho dự án startup...",
      image: projectImageIcon,
      likes: 18,
    },
    {
      id: 3,
      author: "Phạm Cường",
      time: "2 giờ trước",
      description: "Cần designer UI/UX cho website e-commerce...",
      image: projectImageIcon,
      likes: 42,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ paddingTop: 16, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: "#fff", marginTop: 36 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={arrowIcon}
             style={{ width: 20, height: 20 }}
              resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#000" }}>
            Bài đăng cộng đồng
          </Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Filter/Sort Section */}
        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Image
              source={sortIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#3B82F6" }}>
              Mới nhất
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts List */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={{ marginBottom: 20 }}>
            {/* Post Container */}
            <View style={{ backgroundColor: "#fff", overflow: "hidden", borderWidth: 0 }}>
              {/* Post Header */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingHorizontal: 16, paddingTop: 12 }}>
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                  {/* Avatar */}
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#7ec88e",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    <MaterialCommunityIcons name="account" size={20} color="#fff" />
                  </View>
                  {/* Author Info */}
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: "600", color: "#000" }}>
                      {post.author}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                      {post.time}
                    </Text>
                  </View>
                </View>
                {/* Menu Button */}
                <TouchableOpacity style={{ padding: 8 }}>
                  <Image
                    source={optionIcon}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              {/* Description */}
              <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
                <Text style={{ fontSize: 13, color: "#333", lineHeight: 18 }}>
                  {post.description}
                </Text>
              </View>

              {/* Post Image */}
              <TouchableOpacity style={{ marginTop: 6, borderRadius: 0, overflow: "hidden", height: 250, justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={post.image}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Post Footer - Actions */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 30,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderTopWidth: 0,
                  marginTop: 0,
                }}
              >
                {/* Like Button */}
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Image
                    source={likeIcon}
                    style={{ width: 20, height: 20, tintColor: "#ef4444" }}
                    resizeMode="contain"
                  />
                  <Text style={{ fontSize: 12, color: "#666", fontWeight: "500" }}>
                    {post.likes}
                  </Text>
                </TouchableOpacity>

                {/* Save Button */}
                <TouchableOpacity>
                  <Image
                    source={saveIcon}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* Share Button */}
                <TouchableOpacity style={{ marginLeft: 8}}>
                  <Image
                    source={shareIcon}
                    style={{ width: 20, height: 20, tintColor: "#000" }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
