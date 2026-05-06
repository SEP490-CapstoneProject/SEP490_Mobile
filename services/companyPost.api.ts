import { isTokenExpired, refreshToken } from "./auth.api";
import { getToken } from "./storage";
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

export const createCompanyPost = async (postData: any, files: any[] = []) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const formData = new FormData();

    formData.append("postJson", JSON.stringify(postData));
    files.forEach((file, index) => {
      let mimeType = "image/jpeg";

      if (file.type === "video") mimeType = "video/mp4";
      if (file.type === "image") mimeType = "image/jpeg";

      formData.append("files", {
        uri: file.uri,
        name:
          file.name ||
          (file.type === "video" ? `video_${index}.mp4` : `image_${index}.jpg`),
        type: mimeType,
      } as any);
    });

    const res = await fetch(`${BASE_URL_COMPANY}/api/company-posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Tạo bài tuyển dụng thất bại");
    }

    return data;
  } catch (error) {
    console.log("createCompanyPost error:", error);
    return null;
  }
};

export const fetchCompanyPostsByCompany = async (
  companyId: number,
  cursor?: string,
  limit: number = 10,
) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    let url = `${BASE_URL_COMPANY}/api/company-posts/company/${companyId}?limit=${limit}`;

    if (cursor) {
      url += `&cursor=${encodeURIComponent(cursor)}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();
    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      throw new Error(data?.message || "Lấy bài tuyển dụng thất bại");
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const updateCompanyPostFull = async (
  postId: number,
  postData: any,
  files: any[] = [],
) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const formData = new FormData();

    formData.append("postJson", JSON.stringify(postData));

    files.forEach((file, index) => {
      let mimeType = "image/jpeg";

      if (file.type === "video") mimeType = "video/mp4";

      formData.append("files", {
        uri: file.uri,
        name:
          file.name ||
          (file.type === "video" ? `video_${index}.mp4` : `image_${index}.jpg`),
        type: mimeType,
      } as any);
    });

    const res = await fetch(
      `${BASE_URL_COMPANY}/api/company-posts/${postId}/full`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
        body: formData,
      },
    );

    const text = await res.text();
    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      throw new Error(data?.message || "Update thất bại");
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const deleteCompanyPost = async (postId: number) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(`${BASE_URL_COMPANY}/api/company-posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    if (!res.ok) {
      throw new Error("Xóa bài đăng thất bại");
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const fetchCompanyPostsByCompanyId = async (
  companyId: number,
  cursor?: string,
  limit: number = 10,
) => {
  try {
    let token = await getToken();
    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const url = `${process.env.EXPO_PUBLIC_COMPANY_API}/api/company-posts/company/${companyId}?limit=${limit}${
      cursor ? `&cursor=${cursor}` : ""
    }`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "*/*",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy bài tuyển dụng thất bại");
    }

    return data;
  } catch (err) {
    throw err;
  }
};
