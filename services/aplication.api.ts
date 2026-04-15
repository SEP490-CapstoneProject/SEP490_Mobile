import { getToken, isTokenExpired, refreshToken } from "./auth.api";

const BASE_URL_APPLICATION = process.env.EXPO_PUBLIC_APPLICATION_API;

export const applyJob = async (companyPostId: number, portfolioId: number) => {
  try {
    let token = await getToken();
    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(`${BASE_URL_APPLICATION}/api/applications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        companyPostId,
        portfolioId,
      }),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      const message = data?.error || data?.message || "Nộp hồ sơ thất bại";

      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.log("applyJob error:", error);
    throw error;
  }
};
