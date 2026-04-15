import { getToken, isTokenExpired, refreshToken } from "./auth.api";

const BASE_URL_PORTFOLIO = process.env.EXPO_PUBLIC_PORTFOLIO_API;

export const fetchPortfolio = async (
  page: number,
  pageSize: number,
  includeCompliments: boolean,
) => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  const url = `${BASE_URL_PORTFOLIO}/api/portfolio?page=${page}&pageSize=${pageSize}&includeCompliments=${includeCompliments}&sort=2`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (res.status === 401) {
    const newToken = await refreshToken();

    const retryRes = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${newToken}`,
      },
    });

    const retryText = await retryRes.text();
    const retryData = retryText ? JSON.parse(retryText) : null;

    if (!retryRes.ok) {
      throw new Error(retryData?.message || "Lấy portfolio thất bại");
    }

    return retryData.items || retryData;
  }

  if (!res.ok) {
    throw new Error(data?.message || "Lấy portfolio thất bại");
  }

  return data.items || data;
};

export const fetchPortfolioMe = async () => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(`${BASE_URL_PORTFOLIO}/api/portfolio/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy portfolio thất bại");
    }

    return data;
  } catch (error) {
    console.log("fetchPortfolioMe error:", error);
    return null;
  }
};

export const toggleMainPortfolio = async (id: number) => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  const res = await fetch(
    `${BASE_URL_PORTFOLIO}/api/portfolio/${id}/toggle-main`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Đặt bản chính thất bại");
  }

  return true;
};

export const getMyCompliment = async (portfolioId: number) => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  const res = await fetch(
    `${BASE_URL_PORTFOLIO}/api/compliments?portfolioId=${portfolioId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data;
};

export const createCompliment = async (body: any) => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  const res = await fetch(`${BASE_URL_PORTFOLIO}/api/compliments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const updateCompliment = async (id: number, body: any) => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  const res = await fetch(`${BASE_URL_PORTFOLIO}/api/compliments/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const fetchMainPortfolio = async (employeeId: number) => {
  try {
    let token = await getToken();
    if (!token || isTokenExpired(token)) {
      token = await refreshToken();
      if (!token) throw new Error("Token hết hạn");
    }

    const res = await fetch(
      `${BASE_URL_PORTFOLIO}/api/portfolio/employee/${employeeId}/main`,
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
      throw new Error(data?.message || "Lấy main portfolio thất bại");
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const togglePublicPortfolio = async (portfolioId: number) => {
  try {
    let token = await getToken();

    if (!token || isTokenExpired(token)) {
      token = await refreshToken();
      if (!token) throw new Error("Token hết hạn");
    }

    const res = await fetch(
      `${BASE_URL_PORTFOLIO}/api/portfolio/${portfolioId}/toggle-public`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Toggle public thất bại");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
