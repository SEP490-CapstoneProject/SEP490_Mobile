export type InterviewItem = {
  interviewId: number;
  date: string;
  time: string;

  candidate: {
    userId: number;
    name: string;
    avatar: string;
    coverImage: string;
  };

  post: {
    postId: number;
    position: string;
  };

  round: number;
  type: "ONLINE" | "OFFLINE";

  platform?: string;
  link?: string;

  building?: string;
  room?: string;

  status: "UPCOMING" | "COMPLETED" | "CANCELLED";

  interviewerName: string;
};

export const interview: InterviewItem[] = [
  {
    interviewId: 101,
    date: "2026-03-20",
    time: "14:30",

    candidate: {
      userId: 11,
      name: "Phạm An Nhiên",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },

    post: {
      postId: 5,
      position: "UX Designer",
    },

    round: 1,
    type: "ONLINE",
    platform: "Google Meet",
    link: "https://meet.google.com/abc-def",
    status: "UPCOMING",

    interviewerName: "Lê Văn Nam, Phạm Thị A",
  },

  {
    interviewId: 102,
    date: "2026-03-20",
    time: "16:00",

    candidate: {
      userId: 12,
      name: "Đỗ Tuấn Kiệt",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },

    post: {
      postId: 8,
      position: "Frontend Developer",
    },

    round: 1,
    type: "OFFLINE",

    building: "Tòa nhà A",
    room: "Phòng họp 302",

    status: "COMPLETED",

    interviewerName: "Lê Văn Nam",
  },

  {
    interviewId: 103,
    date: "2026-03-21",
    time: "09:00",

    candidate: {
      userId: 15,
      name: "Nguyễn Anh Thư",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    },

    post: {
      postId: 12,
      position: "Backend Developer",
    },

    round: 2,
    type: "OFFLINE",

    building: "Tòa nhà B",
    room: "Phòng họp 201",

    status: "CANCELLED",

    interviewerName: "Trần Minh Tuấn",
  },
];

export const fetchInterviewSchedule = async (): Promise<InterviewItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(interview);
    }, 10);
  });
};
