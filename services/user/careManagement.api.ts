import { getToken, isTokenExpired, refreshToken } from "../auth.api";
const BASE_URL_COMPANY = process.env.EXPO_PUBLIC_COMPANY_API;
const BASE_URL_COMMUNITY = process.env.EXPO_PUBLIC_COMMUNITY_API;

export const fetchSavedJobs = async (limit: number = 10) => {
  try {
    let token = await getToken();

    if (!token || isTokenExpired(token)) {
      const newToken = await refreshToken();

      if (!newToken) {
        throw new Error("Unauthorized");
      }

      token = newToken;
    }

    const res = await fetch(
      `${BASE_URL_COMPANY}/api/company-posts/saved?limit=${limit}`,
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
      throw new Error("Lấy saved jobs thất bại");
    }

    return data.items;
  } catch (err) {
    console.log("fetchSavedJobs error:", err);
    return [];
  }
};

export const fetchSavedPosts = async () => {
  let token = await getToken();
  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }

    token = newToken;
  }

  const res = await fetch(`${BASE_URL_COMMUNITY}/api/community/posts/saved`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || "Lấy danh sách bài đã lưu thất bại");
  }

  return data;
};
