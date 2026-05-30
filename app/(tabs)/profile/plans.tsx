import CustomLoading from "@/components/CustomLoading";
import { useLoading } from "@/components/LoadingContext";
import PlanCard from "@/components/PlanCard";
import { getAuth } from "@/services/storage";
import {
  fetchEntitlements,
  fetchMySubscription,
  fetchPlansByRole,
} from "@/services/subscription.api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function SubscriptionScreen() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<any>(null);

  const [myPlan, setMyPlan] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const auth = await getAuth();

      const [plansData, mySub, entitlement] = await Promise.all([
        fetchPlansByRole(auth?.role),
        fetchMySubscription(),
        fetchEntitlements(Number(auth?.id)),
      ]);

      setPlans(plansData);
      setMyPlan(mySub);
      setCurrentPlan(entitlement);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        <Pressable
          onPress={() =>
            router.push(`/(tabs)/profile/subscriptionManagementPage`)
          }
        >
          <Text
            style={{ color: "#3B82F6", fontSize: 15, marginHorizontal: 20 }}
          >
            Lịch sử
          </Text>
        </Pressable>
      </View>
      {loading ? (
        <CustomLoading />
      ) : (
        <View>
          {currentPlan && (
            <View style={styles.currentPlanBox}>
              <Text style={styles.currentTitle}>Gói đang sử dụng</Text>

              <Text style={styles.planName}>{currentPlan.planName}</Text>

              <Text style={styles.planDesc}>
                Hết hạn:{" "}
                {new Date(currentPlan.expiredAt).toLocaleDateString("vi-VN")}
              </Text>
            </View>
          )}
          <FlatList
            data={plans}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PlanCard plan={item} isCurrent={myPlan?.planId === item.id} />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 210 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF6FF",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  list: {
    padding: 16,
  },
  historyContainer: {
    marginTop: 40,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingVertical: 5,
  },
  currentPlanBox: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 15,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#4F46E5",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  currentTitle: {
    color: "#E0E7FF",
    fontSize: 13,
  },

  planName: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4,
  },

  planDesc: {
    color: "#EEF2FF",
    marginTop: 8,
    lineHeight: 20,
  },
});
