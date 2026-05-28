import PortfolioRenderer from "@/components/portfolio/render/PortfolioRenderer";
import { fetchMainPortfolio } from "@/services/portfolio.api";
import { View } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function Portfolio({ empId }: { empId: number }) {
  const [p, setP] = useState<any>(null);

  useEffect(() => {
    if (!empId) return;

    const load = async () => {
      const data = await fetchMainPortfolio(empId);
      setP(data);
    };

    load();
  }, [empId]);

  if (!p) return null;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {p == null ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text>Không có hồ sơ</Text>
        </View>
      ) : (
        <PortfolioRenderer blocks={p.blocks || []} />
      )}
    </ScrollView>
  );
}
