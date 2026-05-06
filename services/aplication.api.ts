import { isTokenExpired, refreshToken } from "./auth.api";
import { getToken } from "./storage";

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

export const fetchMyApplications = async (page: number, pageSize: number) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL_APPLICATION}/api/applications/me?page=${page}&pageSize=${pageSize}`,
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
      throw new Error(data?.message || "Lấy danh sách application thất bại");
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCompanyApplications = async (
  page: number = 1,
  pageSize: number = 10,
) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL_APPLICATION}/api/applications/company?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy applications thất bại");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateApplicationStatus = async (
  applicationId: number,
  status: number,
) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL_APPLICATION}/api/applications/${applicationId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: status,
        }),
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Cập nhật trạng thái thất bại");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
