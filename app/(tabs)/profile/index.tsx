import { getAuth } from "@/services/auth.api";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function ProfileIndex() {
  const [auth, setAuth] = useState<any>(undefined);

  useEffect(() => {
    getAuth().then(setAuth);
  }, []);

  if (auth === undefined) return null;

  if (!auth) {
    return <Redirect href="/(auth)/login" />;
  }

  if ("companyId" in auth) {
    return <Redirect href="/(tabs)/profile/company" />;
  }

  return <Redirect href="/(tabs)/profile/user" />;
}
