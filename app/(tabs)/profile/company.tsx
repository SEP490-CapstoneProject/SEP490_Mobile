import ProfilePage from "@/components/profile/ProfilePage";
import { getAuth } from "@/services/auth.api";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function CompanyProfile() {
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    getAuth().then(setCompany);
  }, []);

  if (!company) return null;

  return (
    <ProfilePage>
      <Text>Công ty: {company.companyName}</Text>
      <Text>Email: {company.email}</Text>
    </ProfilePage>
  );
}
