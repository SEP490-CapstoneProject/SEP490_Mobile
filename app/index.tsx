import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // TODO: thay bằng AsyncStorage / token thật
    const fakeCheckLogin = async () => {
      setTimeout(() => {
        setIsLoggedIn(true); // đổi true để test vào app
        setLoading(false);
      }, 500);
    };
    fakeCheckLogin();
  }, []);

  if (loading) return null;

  return isLoggedIn
    ? <Redirect href="/(tabs)/home" />
    : <Redirect href="/(auth)/login" />;
}
