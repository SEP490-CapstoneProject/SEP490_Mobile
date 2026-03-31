import { getAuth } from "@/services/auth.api";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeIndex() {
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    getAuth().then(setAuth);
  }, []);

  if (!auth) return null;

  if (auth.role === 2) {
    return <Redirect href="/(tabs)/home/company" />;
  }

  return <Redirect href="/(tabs)/home/user" />;
}
