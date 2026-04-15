import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { useLoading } from "@/components/LoadingContext";
import PortfolioRenderer from "@/components/portfolio/render/portfolioRenderer";
import { applyJob } from "@/services/aplication.api";
import { fetchPortfolioMe } from "@/services/portfolio.api";
import { showError, showSuccess } from "@/utils/toast";
import { router, useLocalSearchParams } from "expo-router";

type Portfolio = {
  portfolioId: number;
  portfolioName: string;
  createdAt: string;
  blocks: any[];
};

export default function ChoosePortfolioScreen() {
  const { postId, position, companyName } = useLocalSearchParams();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const data = await fetchPortfolioMe();

      setPortfolios(data.items || data || []);
    } catch (err) {
      showError("Lỗi", err as string);
    }
  };

  const handleSubmit = async () => {
    if (!selectedId) {
      showError("Yêu cầu thất bại", "Vui lòng chọn hồ sơ đính kèm");
      return;
    }

    try {
      showLoading();
      await applyJob(Number(postId), selectedId);
      hideLoading();
      showSuccess("Thành công", "Bạn đã gửi yêu cầu ứng tuyển thành công");
      router.back();
    } catch (err: any) {
      hideLoading();
      let message = err?.message || "Có lỗi xảy ra";

      if (message.includes("already applied")) {
        message = "Bạn đã ứng tuyển vị trí này rồi";
      }

      showError("Lỗi", message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Text style={styles.header}>Chọn Portfolio để Ứng Tuyển</Text>
        <View style={styles.jobBox}>
          <Text>
            Vị trí: <Text style={{ fontWeight: "bold" }}>{position}</Text>
          </Text>
          <Text>
            Công ty: <Text style={{ fontWeight: "bold" }}>{companyName}</Text>
          </Text>
        </View>
      </View>
      {portfolios.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Không có portfolio
        </Text>
      )}

      <FlatList
        data={portfolios}
        keyExtractor={(item) => item.portfolioId.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedId === item.portfolioId;

          return (
            <Pressable
              style={[styles.card, isSelected && styles.cardActive]}
              onPress={() => setSelectedId(item.portfolioId)}
            >
              <View style={{ flex: 1 }}>
                <PortfolioRenderer blocks={[item.blocks[0]]} />
              </View>
            </Pressable>
          );
        }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable style={styles.cancelBtn} onPress={() => router.back()}>
          <Text>Hủy</Text>
        </Pressable>

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={{ color: "#fff" }}>Nộp Hồ Sơ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 16,
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  jobBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  cardActive: {
    borderColor: "#2f6bff",
    backgroundColor: "#eef3ff",
  },

  radio: {
    marginRight: 10,
    justifyContent: "center",
  },

  radioActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#2f6bff",
  },

  radioInactive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#999",
  },

  footer: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    flexDirection: "row",
  },

  cancelBtn: {
    flex: 1,
    padding: 8,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },

  submitBtn: {
    padding: 8,
    backgroundColor: "#2f6bff",
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
});
