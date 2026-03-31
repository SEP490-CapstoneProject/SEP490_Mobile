import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "./auth.api";
const BASE_URL_USER = process.env.EXPO_PUBLIC_USER_API;

const PROFILE_KEY = "profile";

export const saveProfile = async (data: any) => {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(data));
};

export const getProfile = async () => {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearProfile = async () => {
  await AsyncStorage.removeItem(PROFILE_KEY);
};

export const fetchEmployeeProfile = async () => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL_USER}/api/Employee/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    const error: any = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error("Lấy employee thất bại");
  }

  await saveProfile(data);
  return data;
};

export const fetchCompanyProfile = async () => {
  try {
    const token = await getToken();

    const res = await fetch(`${BASE_URL_USER}/api/Company/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Lấy company thất bại");
    }

    await saveProfile(data);

    return data;
  } catch (err) {
    throw err;
  }
};

// export const updateEmployeeProfile = async (
//   id: number,
//   name?: string,
//   phone?: string,
//   avatar?: any,
//   coverImage?: any,
// ) => {
//   const token = await getToken();

//   const formData = new FormData();

//   if (name) formData.append("Name", name);
//   if (phone) formData.append("Phone", phone);

//   if (avatar) {
//     formData.append("Avatar", avatar);
//   }

//   if (coverImage) {
//     formData.append("CoverImage", coverImage);
//   }

//   const res = await fetch(`${BASE_URL_USER}/api/Employee/${id}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });

//   const data = await res.json();

//   if (!res.ok) throw new Error(data.message || "Update thất bại");

//   return data;
// };
