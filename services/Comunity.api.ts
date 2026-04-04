import { getToken, isTokenExpired, refreshToken } from "@/services/auth.api";

const BASE_URL_COMMUNITY = process.env.EXPO_PUBLIC_COMMUNITY_API;

export const fetchCommunityPosts = async (
  pageSize: number = 20,
  cursor?: number,
) => {
  let url = `${BASE_URL_COMMUNITY}/api/community/posts?pageSize=${pageSize}`;

  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  let token = await getToken();
  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }

    token = newToken;
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || "Lấy bài đăng thất bại");
  }

  return data;
};

export const fetchCreatePost = async (
  description: string,
  media: any[],
  portfolioId?: number,
) => {
  let token = await getToken();

  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();
    if (!newToken) throw { status: 401 };
    token = newToken;
  }

  const formData = new FormData();

  media.forEach((item, index) => {
    const uri = item.uri;

    const ext = item.type === "video" ? "mp4" : uri.split(".").pop() || "jpg";

    const fileName = `file_${index}.${ext}`;

    let fileType =
      item.type === "video" ? "video/mp4" : item.mimeType || "image/jpeg";

    if (fileType === "image/heic") {
      fileType = "image/jpeg";
    }

    formData.append("files", {
      uri,
      name: fileName,
      type: fileType,
    } as any);
  });

  const postJson = {
    description,
    portfolioId: portfolioId ?? null,
    status: 1,
  };

  formData.append("postJson", JSON.stringify(postJson));

  const res = await fetch(`${BASE_URL_COMMUNITY}/api/community/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    let message = "Đăng bài thất bại";

    if (data?.message) message = data.message;
    if (data?.errors) message = Object.values(data.errors).flat().join("\n");

    throw new Error(message);
  }

  return data;
};

export const fetchPostDetail = async (postId: number) => {
  try {
    let token = await getToken();
    if (!token || isTokenExpired(token)) {
      const newToken = await refreshToken();

      if (!newToken) {
        throw { status: 401 };
      }

      token = newToken;
    }

    const res = await fetch(
      `${BASE_URL_COMMUNITY}/api/community/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Lỗi khi lấy chi tiết bài viết");
    }

    return data;
  } catch (err) {
    console.error("fetchPostDetail error:", err);
    return null;
  }
};

export const fetchPostComments = async (postId: number) => {
  try {
    let token = await getToken();
    if (!token || isTokenExpired(token)) {
      const newToken = await refreshToken();

      if (!newToken) {
        throw { status: 401 };
      }

      token = newToken;
    }

    const res = await fetch(
      `${BASE_URL_COMMUNITY}/api/community/posts/${postId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Lỗi khi lấy comment");
    }

    return data;
  } catch (err) {
    console.error("fetchPostComments error:", err);
    return {
      postId,
      comments: [],
    };
  }
};

export const createComment = async (postId: number, content: string) => {
  let token = await getToken();
  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }

    token = newToken;
  }

  const res = await fetch(
    `${BASE_URL_COMMUNITY}/api/community/posts/${postId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    },
  );

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || "Tạo comment thất bại");
  }

  return data;
};

export const replyComment = async (
  commentId: number,
  content: string,
  replyToUserId: number,
) => {
  try {
    let token = await getToken();
    if (!token || isTokenExpired(token)) {
      const newToken = await refreshToken();

      if (!newToken) {
        throw { status: 401 };
      }

      token = newToken;
    }

    const res = await fetch(
      `${BASE_URL_COMMUNITY}/api/community/comments/${commentId}/replies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          replyToUserId,
        }),
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Reply thất bại");
    }

    return data;
  } catch (err) {
    console.error("replyComment error:", err);
    throw err;
  }
};

export const fetchCommunityPostsByUser = async (userId: number) => {
  try {
    const res = await fetch(
      `${BASE_URL_COMMUNITY}/api/community/posts/user/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error instanceof Error ? error.message : "Lỗi không xác định";
  }
};

export const savePost = async (postId: number) => {
  let token = await getToken();
  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }

    token = newToken;
  }
  const res = await fetch(
    `${BASE_URL_COMMUNITY}/api/community/posts/${postId}/save`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Save failed");
};

export const unsavePost = async (postId: number) => {
  let token = await getToken();
  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }

    token = newToken;
  }
  const res = await fetch(
    `${BASE_URL_COMMUNITY}/api/community/posts/${postId}/save`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Unsave failed");
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

export const likePost = async (postId: number) => {
  let token = await getToken();
  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }
    token = newToken;
  }
  const res = await fetch(
    `${BASE_URL_COMMUNITY}/api/community/posts/${postId}/favorite`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Like failed");
};

export const unlikePost = async (postId: number) => {
  let token = await getToken();
  if (!token || isTokenExpired(token)) {
    const newToken = await refreshToken();

    if (!newToken) {
      throw { status: 401 };
    }
    token = newToken;
  }
  const res = await fetch(
    `${BASE_URL_COMMUNITY}/api/community/posts/${postId}/favorite`,
    { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
  );

  if (!res.ok) throw new Error("Unlike failed");
};
