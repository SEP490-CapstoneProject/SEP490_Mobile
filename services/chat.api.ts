import { getToken, isTokenExpired, refreshToken } from "./auth.api";
const BASE_URL_CHAT = process.env.EXPO_PUBLIC_CHAT_API;

export const fetchRoomSummary = async (userId: number) => {
  try {
    let token = await getToken();

    if (!token || isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL_CHAT}/api/Connection/rooms/summary/${userId}`,
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
      throw new Error(data?.message || "Lấy danh sách phòng thất bại");
    }
    return data;
  } catch (error) {
    console.log("fetchRoomSummary error:", error);
    return error instanceof Error ? error.message : "Lỗi không xác định";
  }
};

export const fetchMessagesByRoom = async (
  roomId: number,
  limit: number = 50,
) => {
  try {
    let token = await getToken();

    if (!token || isTokenExpired(token)) {
      token = await refreshToken();
    }

    const url = `${BASE_URL_CHAT}/api/Connection/rooms/${roomId}/messages/latest?limit=${limit}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    const text = await res.text();

    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy tin nhắn thất bại");
    }

    return data;
  } catch (error) {
    console.log("fetchMessagesByRoom error:", error);
    return [];
  }
};

export const createConnection = async (body: {
  userIdFrom: number;
  userIdTo: number;
  profileId: number;
}) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(`${BASE_URL_CHAT}/api/Connection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Tạo connection thất bại");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const getConnectionStatus = async (userId1: number, userId2: number) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL_CHAT}/api/Connection/status/by-users?userId1=${userId1}&userId2=${userId2}`,
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
      throw new Error(data?.message || "Lấy trạng thái connection thất bại");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const updateConnectionStatus = async (id: number, status: string) => {
  try {
    let token = await getToken();
    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(`${BASE_URL_CHAT}/api/Connection/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Cập nhật trạng thái thất bại");
    }

    return data;
  } catch (err) {
    console.log("updateConnectionStatus error:", err);
    throw err;
  }
};

export const getConnectionById = async (id: number) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(`${BASE_URL_CHAT}/api/Connection/${id}`, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy connection thất bại");
    }

    return data;
  } catch (err) {
    console.log("getConnectionById error:", err);
    throw err;
  }
};

export const getRoomSummaryByConnection = async (
  connectionId: number,
  userId?: number,
) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    let url = `${BASE_URL_CHAT}/api/Connection/rooms/summary/by-connection/${connectionId}`;
    if (userId) {
      url += `?userId=${userId}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy room summary thất bại");
    }

    return data;
  } catch (err) {
    throw err;
  }
};
