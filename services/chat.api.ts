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
    console.log("RAW messages:", text);

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
