export interface CommunityPost {
  id: number;

  author: {
    id: number;
    name: string;
    avatar: string;
    role: "COMPANY" | "USER";
  };
  description?: string;
  media?: string[];
  portfolioId?: number;
  portfolioPreview?: {
    type: string;
    variant: string;
    data: any;
  };
  favoriteCount: number;
  commentCount: number;
  isFavorited: boolean;
  isSaved: boolean;
  createdAt: string;
}

export interface CommentUser {
  id: number;
  name: string;
  avatar: string;
  role: "COMPANY" | "USER";
}

export interface ReplyComment {
  id: number;
  author: CommentUser;
  replyToUser: CommentUser;
  content: string;
  createdAt: string;
}

export interface PostComment {
  id: number;
  author: CommentUser;
  content: string;
  createdAt: string;
  replies: ReplyComment[];
}

export interface PostCommentsResponse {
  postId: number;
  comments: PostComment[];
}

// export const fetchCommunityPostsByUser = (
//   userId: number,
// ): Promise<CommunityPost[]> => {
//   console.log("Fetching posts for user ID:", userId);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(
//         COMMUNITY_POSTS_BY_USER_MOCK.filter(
//           (post) => post.author.id === userId,
//         ),
//       );
//     }, 10);
//   });
// };

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

  const res = await fetch(url);

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
    const token = await getToken();

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
    const token = await getToken();

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
  try {
    const token = await getToken();

    const res = await fetch(
      `${BASE_URL_COMMUNITY}/api/community/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Tạo comment thất bại");
    }

    return data;
  } catch (err) {
    console.error("createComment error:", err);
    throw err;
  }
};

export const replyComment = async (
  commentId: number,
  content: string,
  replyToUserId: number,
) => {
  try {
    const token = await getToken();

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

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Reply thất bại");
    }

    return data;
  } catch (err) {
    console.error("replyComment error:", err);
    throw err;
  }
};
