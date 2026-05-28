import { useNotificationStore } from "@/utils/notificationStore";
import { decode as atob } from "base-64";
import { chatRealtimeService } from "./chatRealtimeService";

import { realtimeService } from "./realtimeService";
import {
  clearPlan,
  getRefreshToken,
  getToken,
  removeAuth,
  removeProfile,
  removeRefreshToken,
  removeToken,
  saveAuth,
  saveRefreshToken,
  saveToken,
} from "./storage";

const BASE_URL = process.env.EXPO_PUBLIC_AUTH_API;

export const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;

    return Date.now() > exp - 60000;
  } catch {
    return true;
  }
};

export const refreshToken = async () => {
  try {
    console.log("Token hết hạn → refresh Token");
    console.log("token cũ:", await getToken());
    const refresh = await getRefreshToken();
    console.log("refresh token:", refresh);
    if (!refresh) return null;

    const res = await fetch(`${BASE_URL}/api/Auth/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: refresh }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();
    const raw = text ? JSON.parse(text) : null;

    if (!res.ok || !raw || !raw.data) return null;
    const data = raw.data;

    console.log("Refresh token thành công, token mới:", data.accessToken);
    await saveToken(data.accessToken);
    await saveRefreshToken(data.refreshToken);
    await saveAuth(data.user);
    console.log(" Refresh Token mới đã lưu:", await getRefreshToken());
    return data.accessToken;
  } catch {
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      return false;
    }

    const data = await res.json();

    const token = data.data.accessToken;
    const refreshToken = data.data.refreshToken;
    const user = data.data.user;
    console.log(data.data.user);
    await saveToken(token);
    await saveRefreshToken(refreshToken);
    await saveAuth(user);

    return data.data;
  } catch (err: any) {
    throw err;
  }
};

export const register = async (
  email: string,
  password: string,
  role: number,
) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const logout = async () => {
  useNotificationStore.getState().setSystemNotifications([]);
  useNotificationStore.getState().setCommunityNotifications([]);
  await removeToken();
  await removeAuth();
  await removeRefreshToken();
  await removeProfile();
  await clearPlan();
  chatRealtimeService.stop();
  realtimeService.stop();
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Auth/forgot-password`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(text || "Gửi yêu cầu quên mật khẩu thất bại");
    }

    return text;
  } catch (err: any) {
    throw err.message || "Gửi yêu cầu quên mật khẩu thất bại";
  }
};

export const verifyResetToken = async (email: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Auth/verify-reset-token`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        token,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(text || "Xác thực token thất bại");
    }

    return text;
  } catch (err: any) {
    throw err.message || "Xác thực token thất bại";
  }
};

export const resetPassword = async (
  email: string,
  token: string,
  newPassword: string,
) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Auth/reset-password`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        token,
        newPassword,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(text || "Đặt lại mật khẩu thất bại");
    }

    return text;
  } catch (err: any) {
    throw err.message || "Đặt lại mật khẩu thất bại";
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(`${BASE_URL}/api/Auth/change-password`, {
      method: "PUT",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(text || "Đổi mật khẩu thất bại");
    }

    return text;
  } catch (err: any) {
    throw err.message || "Đổi mật khẩu thất bại";
  }
};
