import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, isTokenExpired, refreshToken } from "./auth.api";

const BASE_URL_SUBSCRIPTION = process.env.EXPO_PUBLIC_SUBSCRIPTION_API;
const BASE_URL_PAYMENT = process.env.EXPO_PUBLIC_PAYMENT_API;

const KEY = "user_plan";

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

export const fetchPlans = async () => {
  try {
    const res = await fetch(`${BASE_URL_SUBSCRIPTION}/api/Plans`, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error("Lấy danh sách gói thất bại");
    }

    return data;
  } catch (err) {
    console.log("Fetch plans error:", err);
    throw err;
  }
};

export const createSubscription = async (planId: number) => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  const res = await fetch(
    `${BASE_URL_SUBSCRIPTION}/api/Subscriptions/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        planId,
        autoRenew: true,
      }),
    },
  );

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || "Không tạo được subscription");
  }

  return data;
};

export const createPayment = async (planId: number, subscriptionId: number) => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  const res = await fetch(`${BASE_URL_PAYMENT}/api/payments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      planId,
      subscriptionId,
    }),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || "Không tạo được link thanh toán");
  }

  return data;
};

export const fetchMySubscription = async () => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  const res = await fetch(
    `${BASE_URL_SUBSCRIPTION}/api/Subscriptions/my-entitlements`,
    {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || "Không lấy được subscription");
  }
  savePlan(data);
  return data;
};
