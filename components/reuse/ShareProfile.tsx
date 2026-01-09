import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Clipboard, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const arrowIcon = require("../../assets/myApp/arrow.png");
const copyIcon = require("../../assets/myApp/copy.png");
const downloadIcon = require("../../assets/myApp/download.png");
const facebookIcon = require("../../assets/myApp/facebook.png");

interface ShareProfileProps {
  profileName?: string;
  shareUrl?: string;
}

export default function ShareProfile({ 
  profileName = "An Nhiên", 
  shareUrl = "https://skillsnap.io/101010/annhien" 
}: ShareProfileProps) {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await Clipboard.setString(shareUrl);
      setIsCopied(true);
      Alert.alert("Thành công", "Đã sao chép liên kết");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      Alert.alert("Lỗi", "Không thể sao chép liên kết");
    }
  };

  const handleDownloadQR = () => {
    Alert.alert("Tải xuống", "Tính năng tải xuống QR đang được phát triển");
  };

  const handleShareFacebook = () => {
    Alert.alert("Chia sẻ", "Tính năng chia sẻ Facebook đang được phát triển");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Spacing for content placeholder */}
      <View style={{ flex: 1, minHeight: 200 }} />

      {/* Main Content */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 18 }}>
        {/* Background Section */}
        <View
          style={{
            backgroundColor: "#EFF6FF",
            borderRadius: 12,
            padding: 16,
          }}
        >
          {/* Link Sharing Section */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", marginBottom: 12 }}>
              Liên kết công khai
            </Text>

            {/* Link Bar */}
            <View style={{ flexDirection: "row", borderRadius: 8, overflow: "hidden", height: 44 }}>
              {/* Link Input Part */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#FFFFFF",
                  paddingHorizontal: 12,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 12, color: "#666", numberOfLines: 1 }}>
                  {shareUrl}
                </Text>
              </View>

              {/* Divider */}
              <View style={{ width: 1, backgroundColor: "#E5E7EB" }} />

              {/* Copy Button Part */}
              <TouchableOpacity
                onPress={handleCopyLink}
                style={{
                  backgroundColor: "#EFF6FF",
                  paddingHorizontal: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: 50,
                }}
              >
                <Image
                  source={copyIcon}
                  style={{ width: 16, height: 16 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          

          {/* QR Code Section */}
          <View style={{ marginBottom: 18, flexDirection: "row", alignItems: "center", gap: 12 }}>
            {/* QR Code */}
            <View
              style={{
                width: 120,
                height: 120,
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E7EB",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <QRCode
                value={shareUrl}
                size={90}
                color="#000000"
                backgroundColor="#FFFFFF"
              />
            </View>

            {/* QR Download Text and Button */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 12, color: "#666", fontWeight: "500" }}>
                Tải xuống mã QR
              </Text>
              <TouchableOpacity
                onPress={handleDownloadQR}
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  borderRadius: 6,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={downloadIcon}
                  style={{ width: 16, height: 16 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Divider with Text */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#000000" }} />
            <Text style={{ marginHorizontal: 12, fontSize: 12, color: "#999" }}>
              Hoặc chia sẻ trực tiếp
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#000000" }} />
          </View>

          {/* Facebook Share Button */}
          <TouchableOpacity
            onPress={handleShareFacebook}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              borderWidth: 2,
              borderColor: "#E5E7EB",
            }}
          >
            <Image
              source={facebookIcon}
              style={{ width: 16, height: 16, marginRight: 8 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 14, color: "#000000", fontWeight: "600" }}>
              Chia sẻ lên Facebook
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
