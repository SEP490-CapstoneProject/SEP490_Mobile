import { getAuth } from "@/services/auth.api";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const auth = getAuth();

      setIsLoggedIn(!!auth);
      setLoading(false);
    };

    checkLogin();
  }, []);

  if (loading) return null;

  return isLoggedIn ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
