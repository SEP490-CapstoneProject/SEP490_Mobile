import {
  Challenge,
  ChallengeSubmission,
  CreateChallengePayload,
  CreateSubmissionPayload,
  CreatorChallengesResponse,
  MyChallengeSubmissionsResponse,
  SubmissionDetailResponse,
  SubmissionsResponse,
} from "../utils/challenge";

import { isTokenExpired, refreshToken } from "./auth.api";
import { getToken } from "./storage";

const BASE_URL = process.env.EXPO_PUBLIC_CHALLENGE_API;

const getAuthHeader = async () => {
  let token = await getToken();

  if (token && isTokenExpired(token)) {
    token = await refreshToken();
  }

  return {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * PUBLIC
 */
export const fetchPublicChallenges = async (
  skip: number = 0,
  take: number = 20,
): Promise<CreatorChallengesResponse> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/challenges/public?skip=${skip}&take=${take}`,
      {
        method: "GET",
        headers: {
          accept: "*/*",
        },
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy danh sách thử thách thất bại");
    }

    return data;
  } catch (err) {
    console.log("Fetch public challenges error:", err);
    throw err;
  }
};

export const fetchPublicChallengeDetail = async (
  challengeId: string,
): Promise<Challenge> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/challenges/public/${challengeId}`,
      {
        method: "GET",
        headers: await getAuthHeader(),
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy chi tiết thử thách thất bại");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * CREATOR
 */
export const fetchCreatorChallenges = async (
  skip: number = 0,
  take: number = 20,
): Promise<CreatorChallengesResponse> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/creator/challenges?skip=${skip}&take=${take}`,
      {
        method: "GET",
        headers: await getAuthHeader(),
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy danh sách challenge thất bại");
    }

    return data;
  } catch (err) {
    console.log("Fetch creator challenges error:", err);
    throw err;
  }
};

export const createChallenge = async (
  payload: CreateChallengePayload,
): Promise<Challenge> => {
  try {
    const res = await fetch(`${BASE_URL}/api/challenges`, {
      method: "POST",
      headers: await getAuthHeader(),
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Tạo thử thách thất bại");
    }

    return data;
  } catch (err) {
    console.log("Create challenge error:", err);
    throw err;
  }
};

export const updateChallenge = async (
  challengeId: string,
  payload: CreateChallengePayload,
): Promise<Challenge> => {
  try {
    const res = await fetch(`${BASE_URL}/api/challenges/${challengeId}`, {
      method: "PUT",
      headers: await getAuthHeader(),
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Cập nhật thử thách thất bại");
    }

    return data;
  } catch (err) {
    console.log("Update challenge error:", err);
    throw err;
  }
};

export const deleteChallenge = async (challengeId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/challenges/${challengeId}`, {
      method: "DELETE",
      headers: await getAuthHeader(),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Xóa thử thách thất bại");
    }

    return data;
  } catch (err) {
    console.log("Delete challenge error:", err);
    throw err;
  }
};

export const submitChallengeForReview = async (
  challengeId: string,
): Promise<Challenge> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/challenges/${challengeId}/submit-review`,
      {
        method: "POST",
        headers: await getAuthHeader(),
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Gửi duyệt thất bại");
    }

    return data;
  } catch (err) {
    console.log("Submit review error:", err);
    throw err;
  }
};

export const approveAndPublishChallenge = async (
  challengeId: string,
): Promise<Challenge> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/creator/challenges/${challengeId}/approve-and-publish`,
      {
        method: "POST",
        headers: await getAuthHeader(),
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Xuất bản thử thách thất bại");
    }

    return data;
  } catch (err) {
    console.log("Approve publish challenge error:", err);
    throw err;
  }
};

export const createSubmission = async (
  challengeId: string,
  payload: CreateSubmissionPayload,
): Promise<ChallengeSubmission> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/submissions?challengeId=${challengeId}`,
      {
        method: "POST",
        headers: await getAuthHeader(),
        body: JSON.stringify(payload),
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Nộp bài thất bại");
    }

    return data;
  } catch (err) {
    console.log("Create submission error:", err);
    throw err;
  }
};

export const getChallengeSubmissions = async (
  challengeId: string,
  skip: number = 0,
  take: number = 20,
): Promise<SubmissionsResponse> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/creator/challenges/${challengeId}/submissions?skip=${skip}&take=${take}`,
      {
        method: "GET",
        headers: await getAuthHeader(),
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy danh sách bài nộp thất bại");
    }

    return data;
  } catch (err) {
    console.log("Get submissions error:", err);
    throw err;
  }
};

export const getSubmissionDetail = async (
  submissionId: string,
): Promise<SubmissionDetailResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/api/submissions/${submissionId}`, {
      method: "GET",
      headers: await getAuthHeader(),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy chi tiết bài nộp thất bại");
    }

    return data;
  } catch (err) {
    console.log("Get submission detail error:", err);
    throw err;
  }
};

export const getMyChallengeSubmissions = async (
  challengeId: string,
  skip: number = 0,
  take: number = 20,
): Promise<MyChallengeSubmissionsResponse> => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/challenges/${challengeId}/my-submissions?skip=${skip}&take=${take}`,
      {
        method: "GET",
        headers: await getAuthHeader(),
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy bài nộp của tôi thất bại");
    }

    return data;
  } catch (err) {
    console.log("Get my submissions error:", err);
    throw err;
  }
};

export const getChallengeDetail = async (id: string) => {
  try {
    const token = await getToken();

    const res = await fetch(`${BASE_URL}/api/challenges/${id}`, {
      method: "GET",
      headers: {
        accept: "text/plain",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();

    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || "Lấy chi tiết thử thách thất bại");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchMyChallengeSubmissions = async (skip = 0, take = 20) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    const res = await fetch(
      `${BASE_URL}/api/submissions/me/challenges?skip=${skip}&take=${take}`,
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
      throw new Error(data?.message || "Lấy danh sách bài nộp thất bại");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchSkillHistory = async (userId: number) => {
  try {
    let token = await getToken();

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    let url = `${BASE_URL}/api/portfolio/skills/${userId}/history`;

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
      throw new Error(data?.message || "Lấy lịch sử kỹ năng thất bại");
    }

    return data;
  } catch (err) {
    console.log("Fetch skill history error:", err);
    throw err;
  }
};
