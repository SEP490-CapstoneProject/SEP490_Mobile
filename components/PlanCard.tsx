import { createPayment, createSubscription } from "@/services/subscription.api";
import { showError, showInfo } from "@/utils/toast";
import * as Linking from "expo-linking";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PlanCard({ plan, isCurrent }: any) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      if (isCurrent) return;

      if (plan.price === 0) {
        showInfo("Gói miễn phí đã được kích hoạt", "");
        return;
      }

      setLoading(true);

      const sub = await createSubscription(plan.id);

      if (!sub?.id) {
        throw new Error("Không tạo được subscription");
      }

      const payment = await createPayment(plan.id, sub.id);

      if (payment?.paymentUrl) {
        await Linking.openURL(payment.paymentUrl);
      } else {
        throw new Error("Không có link thanh toán");
      }
    } catch (err: any) {
      showError("Lỗi", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.card, plan.name === "Pro" && styles.popularCard]}>
      {/* BADGE */}
      {plan.name === "Pro" && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PHỔ BIẾN NHẤT</Text>
        </View>
      )}

      <Text style={styles.name}>{plan.name.toUpperCase()}</Text>
      <Text style={styles.desc}>{plan.description}</Text>

      {/* PRICE */}
      <Text style={styles.price}>
        {plan.price}.000 VND
        <Text style={{ fontSize: 14 }}> /tháng</Text>
      </Text>

      {/* FEATURES */}
      <View style={styles.featureList}>
        {plan.features.map((f: any) => {
          const disabled = f.value === "false";

          return (
            <Text
              key={f.featureKey}
              style={[styles.feature, disabled && styles.featureDisabled]}
            >
              - {f.featureName}{" "}
              {!disabled && (
                <Text style={styles.featureValue}>
                  {f.value === "-1"
                    ? "Vô hạn"
                    : f.value === "true" || f.value === true
                      ? ""
                      : f.value}
                </Text>
              )}
            </Text>
          );
        })}
      </View>

      {/* BUTTON */}
      <Pressable
        style={[styles.btn, isCurrent && styles.btnActive]}
        onPress={handlePayment}
        disabled={isCurrent || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.btnText, isCurrent && { color: "#1B8442" }]}>
            {isCurrent
              ? "Gói bạn sử dụng"
              : plan.price === 0
                ? "Bắt đầu ngay"
                : "Nâng cấp gói"}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
    elevation: 3,
  },

  popularCard: {
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  badge: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  desc: {
    textAlign: "center",
    color: "#888",
    marginBottom: 10,
    fontWeight: "500",
  },

  price: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  featureList: {
    marginBottom: 20,
  },

  feature: {
    fontSize: 14,
    marginBottom: 6,
  },

  featureDisabled: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },

  featureValue: {
    color: "#111827",
  },

  btn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  btnActive: {
    backgroundColor: "#DCFCE7",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
