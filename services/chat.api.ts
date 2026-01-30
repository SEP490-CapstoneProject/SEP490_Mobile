export type MessageRoomItem = {
  roomId: number;
  name: string;
  avatar: string;
  coverImage: string;
  role: "COMPANY" | "USER";
  lastContent: string;
  lastAt: string;
  unreadCount: number;
};

// message room

export type MessageItem = {
  id: number;
  messageRoomId: number;
  userId: number;
  content: string;
  createdAt: string;
  status: "SENT" | "DELIVERED" | "READ";
};

// MOCK messageRoom + message
const MOCK_MESSAGE_ROOMS: MessageRoomItem[] = [
  {
    roomId: 2,
    name: "Google Inc.",
    avatar: "https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    role: "COMPANY",
    lastContent: "Xin chào bạn",
    lastAt: "2026-01-08T10:01:00",
    unreadCount: 0,
  },
  {
    roomId: 3,
    name: "Phạm Cường",
    avatar: "https://i.pravatar.cc/150?img=32",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    role: "USER",
    lastContent: "Chúng mình đang tìm kiếm Freelancer để...",
    lastAt: "2026-01-07T22:10:00",
    unreadCount: 2,
  },
];

export async function fetchMessageRooms(
  userId: number,
): Promise<MessageRoomItem[]> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_MESSAGE_ROOMS;
}

const MOCK_MESSAGES: MessageItem[] = [
  /*ROOM 2 – GOOGLE INC (201)*/
  {
    id: 1,
    messageRoomId: 2,
    userId: 201,
    content: "Xin chào! Cảm ơn bạn đã quan tâm tới Google Inc.",
    createdAt: "2026-01-08T09:00:00",
    status: "READ",
  },
  {
    id: 2,
    messageRoomId: 2,
    userId: 1,
    content:
      "Xin chào anh/chị, tôi muốn ứng tuyển vào vị trí Frontend Developer.",
    createdAt: "2026-01-08T09:01:20",
    status: "READ",
  },
  {
    id: 3,
    messageRoomId: 2,
    userId: 201,
    content: "Rất vui được gặp bạn. Bạn có thể gửi CV hoặc portfolio không?",
    createdAt: "2026-01-08T09:02:10",
    status: "READ",
  },
  {
    id: 4,
    messageRoomId: 2,
    userId: 1,
    content: "Dạ có ạ, đây là portfolio của tôi trên GitHub.",
    createdAt: "2026-01-08T09:03:00",
    status: "READ",
  },
  {
    id: 5,
    messageRoomId: 2,
    userId: 1,
    content: "Tôi cũng có kinh nghiệm với React Native và Expo.",
    createdAt: "2026-01-08T09:03:40",
    status: "READ",
  },
  {
    id: 6,
    messageRoomId: 2,
    userId: 201,
    content: "Rất tốt. Chúng tôi đang cần người có kinh nghiệm mobile.",
    createdAt: "2026-01-08T09:05:10",
    status: "READ",
  },
  {
    id: 7,
    messageRoomId: 2,
    userId: 201,
    content: "Bạn có thể tham gia phỏng vấn online vào tuần sau không?",
    createdAt: "2026-01-08T09:06:00",
    status: "DELIVERED",
  },
  {
    id: 8,
    messageRoomId: 2,
    userId: 1,
    content: "Dạ được ạ, tuần sau tôi khá rảnh.",
    createdAt: "2026-01-08T09:07:30",
    status: "DELIVERED",
  },
  {
    id: 9,
    messageRoomId: 2,
    userId: 1,
    content: "Anh/chị cho tôi hỏi hình thức phỏng vấn như thế nào?",
    createdAt: "2026-01-11T09:08:10",
    status: "DELIVERED",
  },
  {
    id: 10,
    messageRoomId: 2,
    userId: 201,
    content: "Phỏng vấn online qua Google Meet, kéo dài khoảng 45 phút.",
    createdAt: "2026-01-11T10:09:00",
    status: "DELIVERED",
  },
  {
    id: 11,
    messageRoomId: 2,
    userId: 1,
    content: "Dạ vâng, cảm ơn anh/chị rất nhiều!",
    createdAt: "2026-01-11T11:10:15",
    status: "DELIVERED",
  },
  {
    id: 12,
    messageRoomId: 2,
    userId: 201,
    content: "Không có gì. Hẹn gặp bạn trong buổi phỏng vấn nhé 😊",
    createdAt: "2026-01-11T12:11:00",
    status: "DELIVERED",
  },

  /*ROOM 3 – NGƯỜI DÙNG THƯỜNG (305) */
  {
    id: 21,
    messageRoomId: 3,
    userId: 305,
    content: "Chào bạn, mình thấy bạn cũng làm frontend à?",
    createdAt: "2026-01-12T08:30:00",
    status: "READ",
  },
  {
    id: 22,
    messageRoomId: 3,
    userId: 1,
    content: "Ừ đúng rồi, mình chủ yếu làm React và React Native.",
    createdAt: "2026-01-12T08:31:10",
    status: "READ",
  },
  {
    id: 23,
    messageRoomId: 3,
    userId: 305,
    content: "Hay quá, mình đang làm project cá nhân, cần thêm người.",
    createdAt: "2026-01-12T08:32:00",
    status: "DELIVERED",
  },
  {
    id: 24,
    messageRoomId: 3,
    userId: 1,
    content: "Project về mảng gì vậy?",
    createdAt: "2026-01-12T08:33:20",
    status: "DELIVERED",
  },
  {
    id: 25,
    messageRoomId: 3,
    userId: 305,
    content: "App mobile nhỏ, kiểu quản lý công việc, dùng Expo.",
    createdAt: "2026-01-12T08:34:00",
    status: "DELIVERED",
  },
  {
    id: 26,
    messageRoomId: 3,
    userId: 1,
    content: "Nghe hợp đó, để mình xem thử nhé 👍",
    createdAt: "2026-01-12T08:35:10",
    status: "DELIVERED",
  },
];

export async function fetchMessagesByRoom(
  roomId: number,
): Promise<MessageItem[]> {
  await new Promise((r) => setTimeout(r, 300));

  return MOCK_MESSAGES.filter((m) => m.messageRoomId === roomId).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/*export async function sendMessage(
  roomId: number,
  userId: number,
  content: string
): Promise<MessageItem> {
  await new Promise((r) => setTimeout(r, 200));

  const newMessage: MessageItem = {
    id: Date.now(),
    messageRoomId: roomId,
    userId,
    content,
    createdAt: new Date().toISOString(),
    status: "SENT",
  };

  MOCK_MESSAGES.push(newMessage);
  return newMessage;
} */
