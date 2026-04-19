import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import CustomLoading from "@/components/CustomLoading";
import { useLoading } from "@/components/LoadingContext";
import PlanCard from "@/components/PlanCard";
import { fetchMySubscription, fetchPlans } from "@/services/subscription.api";

export default function SubscriptionScreen() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showLoading, hideLoading } = useLoading();

  const [myPlan, setMyPlan] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const plans = await fetchPlans();
    const current = await fetchMySubscription();

    setPlans(plans);
    setMyPlan(current);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        <Pressable>
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
        <FlatList
          data={plans}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PlanCard plan={item} isCurrent={myPlan?.planId === item.id} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
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
});
