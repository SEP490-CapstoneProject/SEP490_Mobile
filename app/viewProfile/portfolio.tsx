import PortfolioRenderer from "@/components/portfolio/render/PortfolioRenderer";
import { fetchMainPortfolio } from "@/services/portfolio.api";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

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
      <PortfolioRenderer blocks={p.blocks || []} />
    </ScrollView>
  );
}
