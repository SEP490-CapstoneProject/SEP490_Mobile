import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const arrowIcon = require("../../../assets/myApp/arrow.png");
const avatarIcon = require("../../../assets/myApp/avatar.png");
const mailIcon = require("../../../assets/myApp/mail.png");
const phoneIcon = require("../../../assets/myApp/phone.png");
const shareIcon = require("../../../assets/myApp/share2.png");
const pencilIcon = require("../../../assets/myApp/pencil.png");
const thunderIcon = require("../../../assets/myApp/thunder.png");
const graduationIcon = require("../../../assets/myApp/graduation.png");
const workingtimeIcon = require("../../../assets/myApp/workingtime.png");
const certificateIcon = require("../../../assets/myApp/certificate.png");
const startupIcon = require("../../../assets/myApp/startup.png");
const projectIcon = require("../../../assets/myApp/project.png");

export default function ViewPortfolio() {
  const router = useRouter();

  const portfolio = {
    id: 1,
    name: "An Nhiên",
    title: "Nhà thiết kế UI/UX & Lập trình viên Frontend",
    email: "anmhien@gmail.com",
    phone: "0374356789",
    description: "Một nhà thiết kế sản phẩm đầy nhiệt huyết với hơn 5 năm kinh nghiệm. Tôi tập trung vào việc tạo ra những trải nghiệm người dùng trực quan, đẹp mắt và giải quyết các vấn đề thiết kế lấy con người làm trung tâm",
    highlights: [
      "Thiết kế UI",
      "Net",
      "React",
      "Figma",
      "JavaScript",
      "Nhiều ảnh",
      "Tạo mẫu",
      "Design",
    ],
    education: [
      {
        school: "Đại học Bách khoa (2016 - 2020)",
        major: "Công nghệ Khoa học máy tính",
        details: [
          "3.8/4.0 (Tốt nghiệp loại giỏi)",
          "Thành viên tích cực câu lạc bộ tin học sinh viên",
        ],
      },
      {
        school: "FPT Academy (2015)",
        major: "Khóa học nâng cao lập trình",
        details: ["Chứng chỉ hoàn thành khóa HTML/CSS cấp"],
      },
    ],
    certifications: [
      {
        title: "Chứng chỉ chuyên môn về thiết kế UX của Google",
        provider: "Coursera, Cấp năm: 2021",
      },
      {
        title: "Meta Frontend developer certificate",
        provider: "Meta, Cấp năm: 2022",
      },
    ],
    workExperience: [
      {
        year: "2021 - Hiện tại",
        position: "Nhà thiết kế sản phẩm cao cấp",
        company: "TechCorp Inc.",
        description: "Dẫn dắt thiết kế các sản phẩm chủ lực, công tác với các nhóm da chức năng để cung cấp các giải pháp lấy người dùng làm trung tâm",
      },
      {
        year: "2020 - 2021",
        position: "Nhà thiết kế UX/UI",
        company: "Innovate Solution",
        description: "Thiết kế giao diện và lường người dùng cho các ứng dụng di động và web, thực hiện nghiên cứu người dùng và khả năng sử dụng",
      },
    ],
    projects: [
      {
        name: "Ứng dụng ngân hàng số OmniBank",
        role: "Thiết kế UI, Frontend Developer",
        description: "Thiết kế và phát triển ứng dụng ngân hàng di động cho một tổng ngân hàng, tập trung vào bảo mật người dùng và trải nghiệm",
        skills: ["Figma", "React.JS", "TypeScript"],
      },
      {
        name: "Ứng dụng OmniBank",
        role: "Thiết kế UI, Frontend Developer",
        description: "Thiết kế giao diện và phát triển các tính năng chính cho ứng dụng ngân hàng",
        skills: ["Figma", "React", "TypeScript"],
      },
      {
        name: "Dự án E-Commerce",
        role: "Lead UX Designer",
        description: "Dẫn dắt thiết kế trải nghiệm cho nền tảng thương mại điện tử quy mô lớn",
        skills: ["Figma", "React", "Node.js"],
      },
    ],
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ paddingTop: 16, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: "#fff", marginTop: 36 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={arrowIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#000", flex: 1, marginLeft: 16 }}>
            Hồ sơ cá nhân
          </Text>
        </View>
      </View>

      {/* Content Container */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        {/* Profile Card */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            marginBottom: 16,
          }}
        >
          {/* Profile Header - Avatar + Name + Job */}
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            {/* Avatar */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                overflow: "hidden",
                marginRight: 16,
                backgroundColor: "#f0f0f0",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Image
                source={avatarIcon}
                style={{ width: 80, height: 80 }}
                resizeMode="cover"
              />
            </View>

            {/* Name + Job Title */}
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              {/* Name */}
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#000", marginBottom: 4 }}>
                {portfolio.name}
              </Text>

              {/* Job Title */}
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#3B82F6" }}>
                {portfolio.title}
              </Text>
            </View>
          </View>

          {/* Description - Full Width */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 12, color: "#666", lineHeight: 16 }}>
              {portfolio.description}
            </Text>
          </View>

          {/* Contact Info - Email & Phone */}
          <View style={{ marginBottom: 12, flexDirection: "row", alignItems: "center", gap: 20 }}>
            {/* Email */}
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Image
                source={mailIcon}
                style={{ width: 14, height: 14, marginRight: 6 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 11, color: "#666", fontWeight: "500" }}>
                {portfolio.email}
              </Text>
            </View>

            {/* Phone */}
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Image
                source={phoneIcon}
                style={{ width: 14, height: 14, marginRight: 6 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 11, color: "#666", fontWeight: "500" }}>
                {portfolio.phone}
              </Text>
            </View>
          </View>

          {/* Action Buttons - Share and Edit */}
          <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
            {/* Share Button */}
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: "#f5f5f5",
                gap: 6,
              }}
            >
              <Image
                source={shareIcon}
                style={{ width: 16, height: 16 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 12, color: "#666", fontWeight: "600" }}>Chia sẻ</Text>
            </TouchableOpacity>

            {/* Edit Button */}
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: "#E1EEFF",
                gap: 6,
              }}
            >
              <Image
                source={pencilIcon}
                style={{ width: 16, height: 16, tintColor: "#3B82F6" }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 12, color: "#3B82F6", fontWeight: "600" }}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Kỹ năng nổi bật */}
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#3B82F6",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Image
                source={thunderIcon}
                style={{ width: 16, height: 16 }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#000" }}>
              Kỹ năng nổi bật
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}
          >
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {portfolio.highlights.map((skill, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#F3F4F6",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#666", fontWeight: "500" }}>
                    {skill}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Học vấn */}
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#3B82F6",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Image
                source={graduationIcon}
                style={{ width: 16, height: 16 }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#000" }}>
              Học vấn
            </Text>
          </View>

          {portfolio.education.map((edu, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: index < portfolio.education.length - 1 ? 12 : 0,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: "700", color: "#000", marginBottom: 4 }}>
                  {edu.school}
                </Text>
                <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>
                  {edu.major}
                </Text>
                {edu.details.map((detail, detailIndex) => (
                  <Text
                    key={detailIndex}
                    style={{ fontSize: 11, color: "#666", marginBottom: 4 }}
                  >
                    • {detail}
                  </Text>
                ))}
              </View>
            ))}
        </View>

        {/* Chứng chỉ */}
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#3B82F6",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Image
                source={certificateIcon}
                style={{ width: 16, height: 16 }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#000" }}>
              Chứng chỉ
            </Text>
          </View>

          {portfolio.certifications.map((cert, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: index < portfolio.certifications.length - 1 ? 12 : 0,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: "700", color: "#000", marginBottom: 4 }}>
                  {cert.title}
                </Text>
                <Text style={{ fontSize: 12, color: "#6B7280" }}>
                  {cert.provider}
                </Text>
              </View>
            ))}
        </View>

        {/* Kinh nghiệm làm việc */}
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#3B82F6",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Image
                source={workingtimeIcon}
                style={{ width: 16, height: 16 }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#000" }}>
              Kinh nghiệm làm việc
            </Text>
          </View>

          {portfolio.workExperience.map((work, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                marginBottom: 16,
              }}
            >
              {/* Timeline dot and line */}
              <View style={{ alignItems: "center", marginRight: 16 }}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#3B82F6",
                    marginBottom: 8,
                  }}
                />
                <View
                  style={{
                    width: 2,
                    height: 100,
                    backgroundColor: "#E5E7EB",
                  }}
                />
              </View>

              {/* Work content */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#F9FAFB",
                  borderRadius: 8,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "700", color: "#3B82F6", marginBottom: 4 }}>
                  {work.year}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: "700", color: "#000", marginBottom: 4 }}>
                  {work.position}
                </Text>
                <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>
                  {work.company}
                </Text>
                <Text style={{ fontSize: 11, color: "#666", lineHeight: 16 }}>
                  {work.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Dự án nổi bật */}
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#3B82F6",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Image
                source={startupIcon}
                style={{ width: 16, height: 16 }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#000" }}>
              Dự án nổi bật
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            style={{ marginHorizontal: -20 }}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          >
            {portfolio.projects.map((project, index) => (
              <View
                key={index}
                style={{
                  width: 320,
                  backgroundColor: "#F9FAFB",
                  borderRadius: 8,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                {/* Project Image */}
                <View
                  style={{
                    width: "100%",
                    height: 240,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={projectIcon}
                    style={{ width: 300, height: 300 }}
                    resizeMode="contain"
                  />
                </View>

                {/* Project Content */}
                <View style={{ padding: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: "700", color: "#000", marginBottom: 4 }}>
                    {project.name}
                  </Text>
                  <Text style={{ fontSize: 11, fontWeight: "600", color: "#3B82F6", marginBottom: 8 }}>
                    {project.role}
                  </Text>
                  <Text style={{ fontSize: 11, color: "#666", lineHeight: 16, marginBottom: 8 }}>
                    {project.description}
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
                    {project.skills.map((skill, skillIndex) => (
                      <View
                        key={skillIndex}
                        style={{
                          backgroundColor: "#E1EEFF",
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ fontSize: 10, color: "#3B82F6", fontWeight: "500" }}>
                          {skill}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}