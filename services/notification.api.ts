export type NotificationType =
  | "CONNECTION_ACCEPTED"
  | "CONNECTION_REJECTED"
  | "PROFILE_VIEWED"
  | "JOB_INVITATION"
  | "PORTFOLIO_APPROVED"
  | "SYSTEM_ANNOUNCEMENT"
  | "COMMUNITY_POST_REPORTED"
  | "PORTFOLIO_REPORTED"
  | "POST_LIKED"
  | "POST_COMMENTED"
  | "POST_COMMENT_REPLIED"
  | "POST_SHARED"
  | "POST_MENTIONED";

export type NotificationActor = {
  id: number;
  name: string;
  avatar: string;
  role: "USER" | "COMPANY";
};

export type NotificationCompany = {
  id: number;
  name: string;
  avatar: string;
  role: "COMPANY";
};

export type UserNotification = {
  id: number;
  userId: number;
  title: string;
  content: string;
  type: NotificationType;
  objectId?: number;
  createdAt: string;
  isRead: boolean;

  actor?: NotificationActor;
  company?: NotificationCompany;
};

export const COMMUNITY_NOTIFICATION_TYPES: NotificationType[] = [
  "POST_LIKED",
  "POST_COMMENTED",
  "POST_COMMENT_REPLIED",
  "POST_SHARED",
  "POST_MENTIONED",
];

// Thông báo cộng đồng
export const isCommunityNotification = (n: UserNotification): boolean => {
  return COMMUNITY_NOTIFICATION_TYPES.includes(n.type);
};

// Tất cả thông báo còn lại
export const isOtherNotification = (n: UserNotification): boolean => {
  return !COMMUNITY_NOTIFICATION_TYPES.includes(n.type);
};

const MOCK_USER_NOTIFICATIONS: UserNotification[] = [
  // ===== COMMUNITY =====
  {
    id: 101,
    userId: 1,
    title: "Bài viết được yêu thích",
    content: "đã thích bài viết của bạn",
    type: "POST_LIKED",
    objectId: 88,
    createdAt: "2026-01-09T10:00:00",
    isRead: false,
    actor: {
      id: 11,
      name: "Nguyễn Văn A",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "USER",
    },
  },
  {
    id: 102,
    userId: 1,
    title: "Bình luận mới",
    content: "đã bình luận bài viết của bạn",
    type: "POST_COMMENTED",
    objectId: 88,
    createdAt: "2026-01-09T10:05:00",
    isRead: false,
    actor: {
      id: 12,
      name: "Trần Thị B",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "USER",
    },
  },

  // ===== KHÁC =====
  {
    id: 201,
    userId: 1,
    title: "Kết nối thành công",
    content: "Yêu cầu kết nối với nhà tuyển dụng của bạn đã được đồng ý.",
    type: "CONNECTION_ACCEPTED",
    objectId: 2,
    createdAt: "2026-01-08T09:30:00",
    isRead: false,
    company: {
      id: 301,
      name: "Google Inc.",
      avatar: "https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg",
      role: "COMPANY",
    },
  },
  {
    id: 301,
    userId: 1,
    title: "Thông báo hệ thống",
    content: "SkillSnap sẽ bảo trì hệ thống vào 22:00 tối nay.",
    type: "SYSTEM_ANNOUNCEMENT",
    createdAt: "2026-01-04T08:00:00",
    isRead: false,
  },
];

export async function fetchUserNotifications(
  userId: number,
): Promise<UserNotification[]> {
  await new Promise((r) => setTimeout(r, 300));

  return MOCK_USER_NOTIFICATIONS.filter((n) => n.userId === userId);
}
