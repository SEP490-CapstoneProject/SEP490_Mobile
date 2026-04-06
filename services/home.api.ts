import { getToken, isTokenExpired, refreshToken } from "./auth.api";
import { PORTFOLIO_MOCK, PortfolioResponse } from "./portfolio.api";
const BASE_URL_COMPANY = process.env.EXPO_PUBLIC_COMPANY_API;

export const fetchJobs = async () => {
  try {
    let token = await getToken();
    if (!token || isTokenExpired(token)) {
      const newToken = await refreshToken();

      if (!newToken) {
        throw new Error("Unauthorized");
      }

      token = newToken;
    }

    const res = await fetch(`${BASE_URL_COMPANY}/api/company-posts?limit=10`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error("Lấy job thất bại");
    }

    return data.items;
  } catch (err) {
    console.log("fetchJobs error:", err);
    return [];
  }
};

export const fetchJobById = async (postId: number) => {
  try {
    let token = await getToken();

    if (!token || isTokenExpired(token)) {
      const newToken = await refreshToken();

      if (!newToken) {
        throw new Error("Unauthorized");
      }

      token = newToken;
    }

    const res = await fetch(`${BASE_URL_COMPANY}/api/company-posts/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error("Lấy chi tiết job thất bại");
    }

    return data;
  } catch (err) {
    console.log("fetchJobById error:", err);
    return null;
  }
};

export const fetchPortfolio = async (): Promise<PortfolioResponse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PORTFOLIO_MOCK);
    }, 1);
  });
};

export const saveJob = async (postId: number) => {
  let token = await getToken();
  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }

    token = newToken;
  }

  const res = await fetch(
    `${BASE_URL_COMPANY}/api/company-posts/${postId}/save`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Save thất bại");
  }

  return await res.json();
};

export const unSaveJob = async (postId: number) => {
  let token = await getToken();
  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }

    token = newToken;
  }

  const res = await fetch(
    `${BASE_URL_COMPANY}/api/company-posts/${postId}/save`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Unsave thất bại");
  }

  return true;
};
