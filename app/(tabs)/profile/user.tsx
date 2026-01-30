import ProfilePage from "@/components/profile/ProfilePage";
import { getAuth } from "@/services/auth.api";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getAuth().then(setUser);
  }, []);

  if (!user) return null;

  return (
    <ProfilePage>
      <Text>Email: {user.email}</Text>
      <Text>Tên: {user.name}</Text>
    </ProfilePage>
  );
}
