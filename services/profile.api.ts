import { getToken, isTokenExpired, refreshToken } from "./auth.api";
const BASE_URL_USER = process.env.EXPO_PUBLIC_USER_API;

export const fetchEmployeeProfile = async () => {
  let token = await getToken();

  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }

    token = newToken;
  }

  let res = await fetch(`${BASE_URL_USER}/api/Employee/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }

    res = await fetch(`${BASE_URL_USER}/api/Employee/me`, {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error("Lấy employee thất bại");
  }

  return data;
};

export const fetchCompanyProfile = async () => {
  let token = await getToken();

  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }

    token = newToken;
  }

  const res = await fetch(`${BASE_URL_USER}/api/Company/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (res.status === 401) {
    throw { status: 401 };
  }

  if (!res.ok) {
    throw new Error("Lấy company thất bại");
  }

  return data;
};

export const updateEmployeeProfile = async (
  id: number,
  name?: string,
  phone?: string,
  avatar?: string | null,
  coverImage?: string | null,
) => {
  const token = await getToken();

  const formData = new FormData();

  if (name) formData.append("Name", name);
  if (phone) formData.append("Phone", phone);

  console.log("avatar:", avatar);
  if (avatar) {
    formData.append("Avatar", {
      uri: avatar,
      name: "avatar.jpg",
      type: "image/jpeg",
    } as any);
  }

  console.log("coverImage:", coverImage);
  if (coverImage) {
    formData.append("CoverImage", {
      uri: coverImage,
      name: "cover.jpg",
      type: "image/jpeg",
    } as any);
  }

  const res = await fetch(`${BASE_URL_USER}/api/Employee/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    let message = "Cập nhật thất bại";

    if (data?.message) {
      message = data.message;
    } else if (data?.errors) {
      message = Object.values(data.errors).flat().join("\n");
    }

    throw new Error(message);
  }

  return data;
};
