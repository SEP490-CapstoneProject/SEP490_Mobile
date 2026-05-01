import { getToken, isTokenExpired, refreshToken } from "./auth.api";

const BASE_URL_NOTIFICATION = process.env.EXPO_PUBLIC_NOTIFICATION_API;

export const fetchNotifications = async (cursor?: number) => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  let url = `${BASE_URL_NOTIFICATION}/api/notifications?limit=20`;

  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};

export const markNotificationAsRead = async (id: number) => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  const res = await fetch(
    `${BASE_URL_NOTIFICATION}/api/notifications/${id}/read`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Mark read failed");
  }
};

export const markAllNotificationsAsRead = async () => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  const res = await fetch(
    `${BASE_URL_NOTIFICATION}/api/notifications/read-all`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Mark all read failed");
  }
};

export const fetchSystemNotifications = async (limit: number = 20) => {
  try {
    let token = await getToken();
    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL_NOTIFICATION}/api/notifications/system?limit=${limit}`,
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
      throw new Error(data?.message || "Lấy system notification thất bại");
    }
    return data;
  } catch (err) {
    return null;
  }
};

export const fetchCommunityNotifications = async (limit: number = 20) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL_NOTIFICATION}/api/notifications/community?limit=${limit}`,
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
      throw new Error(data?.message || "Lấy community notification thất bại");
    }
    return data;
  } catch (err) {
    return null;
  }
};
