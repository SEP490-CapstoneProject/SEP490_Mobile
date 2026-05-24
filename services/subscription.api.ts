import { isTokenExpired, refreshToken } from "./auth.api";
import { getToken, savePlan } from "./storage";

const BASE_URL_SUBSCRIPTION = process.env.EXPO_PUBLIC_SUBSCRIPTION_API;
const BASE_URL_PAYMENT = process.env.EXPO_PUBLIC_PAYMENT_API;

export const fetchPlansByRole = async (role: number | string) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL_SUBSCRIPTION}/api/Plans/by-role/${role}`,
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
      throw new Error(data?.message || "Lấy danh sách gói thất bại");
    }

    return data;
  } catch (err) {
    console.log("Fetch plans by role error:", err);
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

export const fetchEntitlements = async (userId: number) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL_SUBSCRIPTION}/api/Subscriptions/entitlements/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      },
    );

    const text = await res.text();

    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy entitlements thất bại");
    }

    return data;
  } catch (err) {
    console.log("fetchEntitlements error:", err);
    return null;
  }
};

export const fetchPaymentHistory = async (
  page: number = 1,
  pageSize: number = 5,
) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL_PAYMENT}/api/payments/my-history?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      },
    );

    const text = await res.text();

    const data = text ? JSON.parse(text) : [];

    if (!res.ok) {
      throw new Error(data?.message || "Lấy lịch sử thanh toán thất bại");
    }

    return data;
  } catch (err) {
    console.log("fetchPaymentHistory error:", err);
    return [];
  }
};
