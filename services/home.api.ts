import { PORTFOLIO_MOCK, PortfolioResponse } from "./portfolio.api";
const BASE_URL_COMPANY = process.env.EXPO_PUBLIC_COMPANY_API;

export const fetchJobs = async () => {
  const res = await fetch(`${BASE_URL_COMPANY}/api/company-posts?limit=10`);

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error("Lấy job thất bại");
  }

  return data.items;
};

export const fetchJobById = async (postId: number) => {
  try {
    const res = await fetch(`${BASE_URL_COMPANY}/api/company-posts/${postId}`);

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
