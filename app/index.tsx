import { getToken } from "@/services/auth.api";
import { realtimeService } from "@/services/realtimeService";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    getToken().then(setToken);
  }, []);

  useEffect(() => {
    if (token) {
      realtimeService.initConnection(token);
      realtimeService.start();
    }
    return () => realtimeService.stop();
  }, [token]);

  if (token === undefined) return null;

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
