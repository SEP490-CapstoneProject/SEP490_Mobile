

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
  | "MESSAGE_RECEIVED"
  | "PORTFOLIO_APPROVED"
  | "SYSTEM_ANNOUNCEMENT";


export type NotificationDetail = {
  id: number;
  title: string;
  content: string;
  type: NotificationType;
  createdAt: string;

  // Có thể null tuỳ loại
  company?: {
    id: number;
    name: string;
    avatar: string;
    verified: boolean;
  };

  user?: {
    id: number;
    name: string;
    avatar: string;
  };

  action?: {
    label: string;
    type:
      | "START_CHAT"
      | "VIEW_PROFILE"
      | "VIEW_JOB"
      | "VIEW_PORTFOLIO";
    targetId: number;
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


const MOCK_NOTIFICATION_DETAILS: Record<number, NotificationDetail> = {
  //  Kết nối được chấp nhận
  1: {
    id: 1,
    title: "Kết nối thành công",
    content:
      "Yêu cầu kết nối với nhà tuyển dụng của bạn đã được đồng ý. Từ giờ bạn có thể trò chuyện.",
    type: "CONNECTION_ACCEPTED",
    createdAt: "2026-01-08T09:30:00",
    company: {
      id: 201,
      name: "Google Inc.",
      avatar: "https://logo.clearbit.com/google.com",
      verified: true,
    },
    action: {
      label: "Bắt đầu trò chuyện",
      type: "START_CHAT",
      targetId: 2, // roomId
    },
  },

  // Kết nối bị từ chối
  2: {
    id: 2,
    title: "Kết nối chưa thành công",
    content:
      "Nhà tuyển dụng đã từ chối yêu cầu kết nối của bạn.",
    type: "CONNECTION_REJECTED",
    createdAt: "2026-01-07T18:10:00",
    company: {
      id: 202,
      name: "Meta",
      avatar: "https://logo.clearbit.com/meta.com",
      verified: true,
    },
  },

  // Hồ sơ được xem
  3: {
    id: 3,
    title: "Hồ sơ được quan tâm",
    content:
      "Google Inc. đã xem hồ sơ của bạn.",
    type: "PROFILE_VIEWED",
    createdAt: "2026-01-07T15:45:00",
    company: {
      id: 201,
      name: "Google Inc.",
      avatar: "https://logo.clearbit.com/google.com",
      verified: true,
    },
    action: {
      label: "Xem hồ sơ",
      type: "VIEW_PROFILE",
      targetId: 1, 
    },
  },

  // Lời mời ứng tuyển
  4: {
    id: 4,
    title: "Lời mời ứng tuyển",
    content:
      "Bạn được mời ứng tuyển vào vị trí Frontend Developer.",
    type: "JOB_INVITATION",
    createdAt: "2026-01-06T20:00:00",
    company: {
      id: 203,
      name: "FPT Software",
      avatar: "https://logo.clearbit.com/fpt.com.vn",
      verified: true,
    },
    action: {
      label: "Xem công việc",
      type: "VIEW_JOB",
      targetId: 501, // jobId
    },
  },

  // Tin nhắn mới
  5: {
    id: 5,
    title: "Tin nhắn mới",
    content:
      "Bạn có một tin nhắn mới từ nhà tuyển dụng.",
    type: "MESSAGE_RECEIVED",
    createdAt: "2026-01-08T10:05:00",
    company: {
      id: 201,
      name: "Google Inc.",
      avatar: "https://logo.clearbit.com/google.com",
      verified: true,
    },
    action: {
      label: "Mở chat",
      type: "START_CHAT",
      targetId: 2, // roomId
    },
  },

  // Portfolio được duyệt
  6: {
    id: 6,
    title: "Portfolio được duyệt",
    content:
      "Portfolio của bạn đã được kiểm duyệt và hiển thị công khai.",
    type: "PORTFOLIO_APPROVED",
    createdAt: "2026-01-05T09:00:00",
    action: {
      label: "Xem portfolio",
      type: "VIEW_PORTFOLIO",
      targetId: 99, // portfolioId
    },
  },

  // Thông báo hệ thống
  7: {
    id: 7,
    title: "Thông báo hệ thống",
    content:
      "SkillSnap sẽ bảo trì hệ thống vào 22:00 tối nay.",
    type: "SYSTEM_ANNOUNCEMENT",
    createdAt: "2026-01-04T08:00:00",
  },
};

export async function fetchNotificationDetail(
  notificationId: number
): Promise<NotificationDetail> {
  await new Promise((r) => setTimeout(r, 300));

  return MOCK_NOTIFICATION_DETAILS[notificationId];
}
