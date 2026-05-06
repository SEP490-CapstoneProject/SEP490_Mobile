import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const STORAGE_KEY = "auth";
const KEY = "user_plan";

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

export const saveProfile = async (profile: any) => {
  await AsyncStorage.setItem("profile", JSON.stringify(profile));
};

export const getProfile = async () => {
  const raw = await AsyncStorage.getItem("profile");
  return raw ? JSON.parse(raw) : null;
};

export const removeProfile = async () => {
  await AsyncStorage.removeItem("profile");
};

export const savePlan = async (plan: any) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(plan));
};

export const getPlan = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
};

export const clearPlan = async () => {
  await AsyncStorage.removeItem(KEY);
};
