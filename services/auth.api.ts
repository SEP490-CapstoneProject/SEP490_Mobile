import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode as atob } from "base-64";
import {
  removeProfile
} from "./profile.api";
const BASE_URL = process.env.EXPO_PUBLIC_AUTH_API;

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const STORAGE_KEY = "auth";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const saveRefreshToken = async (refreshToken: string) => {
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getRefreshToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};
export const removeRefreshToken = async () => {
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const saveAuth = async (user: any) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const getAuth = async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const removeAuth = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

export const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;

    return Date.now() > exp - 60000;
  } catch {
    return true;
  }
};

export const refreshToken = async () => {
  try {
    console.log("Token hết hạn → refresh Token");
    console.log("token cũ:", await getToken());
    const refresh = await getRefreshToken();
    console.log("refresh token:", refresh);
    if (!refresh) return null;

    const res = await fetch(`${BASE_URL}/api/Auth/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: refresh }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();
    const raw = text ? JSON.parse(text) : null;

    if (!res.ok || !raw || !raw.data) return null;
    const data = raw.data;

    console.log("Refresh token thành công, token mới:", data.accessToken);
    await saveToken(data.accessToken);
    await saveRefreshToken(data.refreshToken);
    await saveAuth(data.user);
    console.log(" Refresh Token mới đã lưu:", await getRefreshToken());
    return data.accessToken;
  } catch {
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      return false;
    }

    const data = await res.json();

    const token = data.data.accessToken;
    const refreshToken = data.data.refreshToken;
    const user = data.data.user;

    await saveToken(token);
    await saveRefreshToken(refreshToken);
    await saveAuth(user);

    return data.data;
  } catch (err: any) {
    throw err;
  }
};

export const register = async (
  email: string,
  password: string,
  role: number,
) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(STORAGE_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  await removeProfile();
};
