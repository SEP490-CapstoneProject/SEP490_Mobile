import { getToken, isTokenExpired, refreshToken } from "@/services/auth.api";
import { realtimeService } from "@/services/realtimeService";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    getToken().then(setToken);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      let currentToken = token;

      if (!currentToken || isTokenExpired(currentToken)) {
        const newToken = await refreshToken();

        if (!newToken) {
          console.log("Token hết hạn, cần login lại");
          return;
        }

        setToken(newToken);
        currentToken = newToken;
      }

      if (currentToken) {
        realtimeService.initConnection(currentToken);
        realtimeService.start();
      }
    };

    initAuth();
  }, []);

  if (token === undefined) return null;

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
