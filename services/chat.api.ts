

export type NotificationItem = {
  id: number;
  title: string;
  content: string;
  type: string;
  objectId: number;
  createdAt: string;
  isRead: boolean;
};


export type MessageRoomItem = {
  roomId: number;
  name: string;
  avatar: string;
  role: "COMPANY" | "USER"
  lastContent: string;
  lastAt: string;
  unreadCount: number;
};

export type NotificationType =
  | "CONNECTION_ACCEPTED"
  | "CONNECTION_REJECTED"
  | "PROFILE_VIEWED"
  | "JOB_INVITATION"
  | "PORTFOLIO_APPROVED"
  | "SYSTEM_ANNOUNCEMENT"
  | "COMMUNITY_POST_REPORTED"
  | "PORTFOLIO_REPORTED";



export type UserNotification = {
  id: number;
  userId: number;
  title: string;
  content: string;
  type: NotificationType;
  objectId?: number;
  createdAt: string;
  isRead: boolean;

  company?: {
    id: number;
    name: string;
    avatar: string;
  };
};






const MOCK_NOTIFICATION: NotificationItem = {
  id: 1,
  title: "Kết nối thành công",
  content: "Yêu cầu kết nối với nhà tuyển dụng đã được đồng ý.",
  type: "CONNECTION_ACCEPTED",
  objectId: 10,
  createdAt: "2026-01-08T09:30:00",
  isRead: false,
};



export async function fetchNotification(
  userId: number
): Promise<NotificationItem | null> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_NOTIFICATION;
}




// MOCK messageRoom + message
const MOCK_MESSAGE_ROOMS: MessageRoomItem[] = [
  {
    roomId: 2,
    name: "Google Inc.",
    avatar: "https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg",
    role: "COMPANY",
    lastContent: "Xin chào bạn",
    lastAt: "2026-01-08T10:01:00",
    unreadCount: 0,
  },
  {
    roomId: 3,
    name: "Phạm Cường",
    avatar: "https://i.pravatar.cc/150?img=32",
    role: "USER",
    lastContent: "Chúng mình đang tìm kiếm Freelancer để...",
    lastAt: "2026-01-07T22:10:00",
    unreadCount: 2,
  },
];

export async function fetchMessageRooms(
  userId: number
): Promise<MessageRoomItem[]> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_MESSAGE_ROOMS;
}


const MOCK_USER_NOTIFICATION_DETAILS: UserNotification[] = [
  //  Kết nối thành công → mở chat (messageRoomId = 2)
  {
    id: 1,
    userId: 1,
    title: "Kết nối thành công",
    content:
      "Yêu cầu kết nối với nhà tuyển dụng của bạn đã được đồng ý. Từ giờ bạn có thể trò chuyện.",
    type: "CONNECTION_ACCEPTED",
    objectId: 2,
    createdAt: "2026-01-08T09:30:00",
    isRead: false,
    company: {
      id: 201,
      name: "Google Inc.",
      avatar:
        "https://athgroup.vn/upload/blocks/thumb_1920x0/ATH-kh%C3%A1m-ph%C3%A1-logo-amazon-1.jpg",
    },
  },

  //  Hồ sơ được xem → mở profile (profileId = 1)
  {
    id: 3,
    userId: 1,
    title: "Hồ sơ được quan tâm",
    content: "Nhà tuyển dụng đã xem hồ sơ của bạn.",
    type: "PROFILE_VIEWED",
    objectId: 1,
    createdAt: "2026-01-07T15:45:00",
    isRead: true,
    company: {
      id: 202,
      name: "Meta",
      avatar:
        "https://athgroup.vn/upload/blocks/thumb_1920x0/ATH-kh%C3%A1m-ph%C3%A1-logo-amazon-1.jpg",
    },
  },

  //  Lời mời ứng tuyển → mở job (jobId = 501)
  {
    id: 4,
    userId: 1,
    title: "Lời mời ứng tuyển",
    content: "Bạn được mời ứng tuyển vào vị trí Frontend Developer.",
    type: "JOB_INVITATION",
    objectId: 501,
    createdAt: "2026-01-06T20:00:00",
    isRead: false,
    company: {
      id: 203,
      name: "FPT Software",
      avatar:
        "https://athgroup.vn/upload/blocks/thumb_1920x0/ATH-kh%C3%A1m-ph%C3%A1-logo-amazon-1.jpg",
    },
  },

  //  Portfolio được duyệt → mở portfolio (portfolioId = 99)
  {
    id: 5,
    userId: 1,
    title: "Portfolio được duyệt",
    content: "Portfolio của bạn đã được kiểm duyệt và hiển thị công khai.",
    type: "PORTFOLIO_APPROVED",
    objectId: 99,
    createdAt: "2026-01-05T09:00:00",
    isRead: true,
  },

  //  Kết nối bị từ chối → không điều hướng
  {
    id: 6,
    userId: 1,
    title: "Kết nối chưa thành công",
    content: "Nhà tuyển dụng đã từ chối yêu cầu kết nối của bạn.",
    type: "CONNECTION_REJECTED",
    createdAt: "2026-01-04T18:30:00",
    isRead: true,
    company: {
      id: 204,
      name: "Amazon",
      avatar:
        "https://athgroup.vn/upload/blocks/thumb_1920x0/ATH-kh%C3%A1m-ph%C3%A1-logo-amazon-1.jpg",
    },
  },

  //  Thông báo hệ thống → chỉ đọc
  {
    id: 7,
    userId: 1,
    title: "Thông báo hệ thống",
    content: "SkillSnap sẽ bảo trì hệ thống vào 22:00 tối nay.",
    type: "SYSTEM_ANNOUNCEMENT",
    createdAt: "2026-01-04T08:00:00",
    isRead: false,
  },
];



export async function fetchUserNotifications(
  userId: number
): Promise<UserNotification[]> {
  await new Promise((r) => setTimeout(r, 300));

  return MOCK_USER_NOTIFICATION_DETAILS.filter(
    (n) => n.userId === userId
  );
}

