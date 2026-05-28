import { useLoading } from "@/components/LoadingContext";
import { fetchJobById, reportCompanyPost } from "@/services/companyPost.api";
import { showError, showInfo, showSuccess } from "@/utils/toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Detail() {
  const router = useRouter();
  const { postId } = useLocalSearchParams();
  const [jobDetail, setJobDetail] = useState<any | null>(null);
  const [reportVisible, setReportVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const { showLoading, hideLoading } = useLoading();

  const reasons = [
    "Spam",
    "Thông tin sai lệch",
    "Lừa đảo",
    "Nội dung không phù hợp",
    "Tin tuyển dụng giả",
    "Khác",
  ];

  useEffect(() => {
    const loadJobDetail = async () => {
      try {
        if (typeof postId === "string") {
          const fetchedJobDetail = await fetchJobById(Number(postId));
          setJobDetail(fetchedJobDetail);
        }
      } catch (e) {
        console.error(e);
      } finally {
      }
    };
    loadJobDetail();
  }, [postId]);

  const handleReport = async () => {
    try {
      if (!selectedReason) {
        showInfo(
          "Vui lòng chọn lý do",
          "Bạn cần chọn một lý do để báo cáo bài đăng này.",
        );
        return;
      }

      showLoading();

      await reportCompanyPost(
        Number(jobDetail?.postId),
        selectedReason,
        description,
      );

      setReportVisible(false);
      setSelectedReason("");
      setDescription("");

      showSuccess("Đã gửi báo cáo", "Báo cáo của bạn đã được gửi thành công.");
    } catch (err: any) {
      showError(
        "Báo cáo thất bại",
        err.message || "Đã xảy ra lỗi khi gửi báo cáo.",
      );
    } finally {
      hideLoading();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconLeft}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backgroundIcon}
          >
            <Image
              source={require("../../../assets/myApp/arrow.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>
        <View style={styles.iconRight}>
          <View style={styles.backgroundIcon}>
            <Image
              source={require("../../../assets/myApp/share_black.png")}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/MediaPreview",
              params: {
                images: JSON.stringify(
                  jobDetail?.media?.map((m: any) => m.url) || [],
                ),
                index: 0,
              },
            })
          }
        >
          <Image
            source={
              jobDetail?.media?.[0]?.url || jobDetail?.coverImageUrl
                ? {
                    uri: jobDetail?.media?.[0]?.url || jobDetail?.coverImageUrl,
                  }
                : require("@/assets/myApp/Logo.png")
            }
            style={{ width: "100%", height: 250 }}
          />
        </Pressable>
        {/* Header Content */}
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
            <View style={{ flexDirection: "row", gap: 20, marginTop: 10 }}>
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
                <Text style={styles.textContent}>
                  {jobDetail?.employmentType}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 20, marginTop: 10 }}>
              <View style={styles.contentContainer}>
                <Image
                  source={require("../../../assets/myApp/star.png")}
                  style={styles.locationIcon}
                />
                <Text style={styles.textContent}>
                  +{jobDetail?.experienceYear} Năm kinh nghiệm
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <Image
                  source={require("../../../assets/myApp/group1.png")}
                  style={styles.locationIcon}
                />
                <Text style={styles.textContent}>
                  {jobDetail?.quantity} Ứng viên
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Body Content */}
        <View style={styles.bodyContent}>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.flexLabel}>
              <View style={styles.verticalScroll}></View>
              <Text style={styles.label}>Mô tả công việc</Text>
            </View>
            <Text style={styles.text}>{jobDetail?.jobDescription}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.flexLabel}>
              <View style={styles.verticalScroll}></View>
              <Text style={styles.label}>Yêu cầu chuyên môn</Text>
            </View>
            <View>
              <View>
                <View style={styles.YeuCauChuyenMon}>
                  <Text style={styles.YeuCauChuyenMonText}>Bắt buộc</Text>
                </View>
                <Text style={styles.text}>
                  {jobDetail?.requirementsMandatory}
                </Text>
              </View>
              <View>
                <View style={styles.YeuTienChuyenMon}>
                  <Text style={styles.YeuTienChuyenMonText}>Ưu tiên</Text>
                </View>
                <Text style={styles.text}>
                  {jobDetail?.requirementsPreferred}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.flexLabel}>
              <View style={styles.verticalScroll}></View>
              <Text style={styles.label}>Quyền lợi & Đãi ngộ</Text>
            </View>
            <Text style={styles.text}>{jobDetail?.benefits}</Text>
          </View>
        </View>
        {/* Footer Content */}
        <View style={styles.footerContent}>
          <Pressable
            style={styles.bntFooterContent}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/home/choosePortfolio",
                params: {
                  postId: jobDetail?.postId,
                  position: jobDetail?.position,
                  companyName: jobDetail?.companyName,
                },
              })
            }
          >
            <Text style={{ color: "white" }}>Tham gia ứng tuyển</Text>
          </Pressable>
          <Pressable
            style={styles.bntDotFooter}
            onPress={() => setReportVisible(true)}
          >
            <Image
              source={require("../../../assets/myApp/dots.png")}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
        </View>
      </ScrollView>
      <Modal
        visible={reportVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReportVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setReportVisible(false)}
        >
          <Pressable style={styles.reportContainer}>
            <View style={styles.reportHandle} />

            <Text style={styles.reportTitle}>Báo cáo bài đăng</Text>

            <Text style={styles.reportSub}>
              Vì sao bạn muốn báo cáo bài đăng này?
            </Text>

            <View style={{ marginTop: 20 }}>
              {reasons.map((item, index) => (
                <Pressable
                  key={index}
                  style={[styles.reasonItem]}
                  onPress={() => setSelectedReason(item)}
                >
                  <Text
                    style={[
                      styles.reasonText,
                      selectedReason === item && styles.reasonTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            <TextInput
              placeholder="Mô tả thêm..."
              multiline
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />

            <Pressable style={[styles.reportBtn]} onPress={handleReport}>
              <Text style={styles.reportBtnText}>Gửi báo cáo</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
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
    zIndex: 10,
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

  bodyContent: {
    marginTop: 160,
    paddingHorizontal: 10,
  },

  verticalScroll: {
    backgroundColor: "#3B82F6",
    width: 5,
    height: 35,
    borderRadius: 2.5,
  },
  flexLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  text: {
    marginTop: 10,
    color: "#6B7280",
    lineHeight: 20,
  },

  YeuCauChuyenMon: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    width: 80,
    height: 24,
    borderColor: "#FF4848",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 15,
  },
  YeuCauChuyenMonText: {
    color: "#FF4848",
    fontWeight: "bold",
    fontSize: 12,
  },
  YeuTienChuyenMon: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    width: 80,
    height: 24,
    borderColor: "#3B82F6",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 15,
  },
  YeuTienChuyenMonText: {
    color: "#3B82F6",
    fontWeight: "bold",
    fontSize: 12,
  },

  footerContent: {
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 30,
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  bntFooterContent: {
    backgroundColor: "#3B82F6",
    width: 250,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  bntDotFooter: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  reportContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    paddingBottom: 40,
  },

  reportHandle: {
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
    alignSelf: "center",
    marginBottom: 20,
  },

  reportTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  reportSub: {
    marginTop: 8,
    color: "#6B7280",
    fontSize: 14,
  },

  reasonItem: {
    paddingBottom: 10,
    paddingHorizontal: 18,
    marginBottom: 12,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
  },

  reasonText: {
    fontSize: 15,
    color: "#111827",
  },

  reasonTextActive: {
    color: "#2563EB",
  },

  input: {
    marginTop: 10,
    minHeight: 110,
    backgroundColor: "#F9FAFB",
    borderRadius: 18,
    padding: 16,
    textAlignVertical: "top",
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  reportBtn: {
    marginTop: 20,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  reportBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
