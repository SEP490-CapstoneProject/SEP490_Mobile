import Footer from "@/components/Footer";
import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Footer />
    </>
  );
}
