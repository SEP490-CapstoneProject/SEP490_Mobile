import { CommunityPost } from "../Comunity.api";
import { Job } from "../home.api";

export const demoJobs: Job[] = [
  {
    postId: 1,
    position: "Senior UX Designer",
    companyName: "Google Inc.",
    companyAvatar:
      "https://itplus-academy.edu.vn/upload/c47d9c29fc44c2b7996a2613aec3c1f9/files/7.jpg",

    mediaType: "image",
    mediaUrl:
      "https://nads.1cdn.vn/2024/07/10/W_z5620155725694_52977c30a98953391be8bda1f9b50ba7.jpg",

    address: "1/1, Long Thạnh Mỹ, Hồ Chí Minh",
    salary: "25.000.000 - 30.000.000",
    employmentType: "Full-time",

    isFavorited: false,
    isSaved: true,
  },
  {
    postId: 2,
    position: "Frontend Developer (React)",
    companyName: "FPT Software",
    companyAvatar:
      "https://maunailxinh.com/wp-content/uploads/2025/05/hinh-anh-hello-kitty-de-thuong.jpg",

    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",

    address: "Quận 7, Hồ Chí Minh",
    salary: "18.000.000 - 25.000.000",
    employmentType: "Full-time",

    isFavorited: true,
    isSaved: true,
  },
  {
    postId: 3,
    position: "Frontend Developer",
    companyName: "FPT Software",
    companyAvatar:
      "https://gobranding.com.vn/wp-content/uploads/2023/06/9-photographer-la-gi.jpg",

    mediaType: "image",
    mediaUrl:
      "https://i.pinimg.com/736x/15/d8/ba/15d8ba4e29cbf24cf18d26cb1175829d.jpg",

    address: "Quận 7, Hồ Chí Minh",
    salary: "18.000.000 - 25.000.000",
    employmentType: "Full-time",

    isFavorited: true,
    isSaved: true,
  },
];

export const community: CommunityPost[] = [
  {
    id: 3,
    author: {
      id: 11,
      name: "Lê Thu Hà",
      avatar: "https://i.pravatar.cc/150?img=32",
      role: "USER",
    },
    description:
      "Hôm nay mình xin chia sẻ công thức làm món sườn xào chua ngọt chuẩn vị nhà làm. Bí quyết chính là ở phần nước sốt tỷ lệ vàng giúp sườn mềm, thấm vị và có màu cánh gián cực đẹp...",
    media: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    ],
    favoriteCount: 1200,
    commentCount: 86,
    isFavorited: true,
    isSaved: true,
    createdAt: "2026-03-14T08:20:00Z",
  },
  {
    id: 2,
    author: {
      id: 15,
      name: "Trần Minh Quân",
      avatar: "https://i.pravatar.cc/150?img=12",
      role: "USER",
    },
    description:
      "Mọi người thường dùng công cụ gì để quản lý dự án design cá nhân vậy? Mình đang phân vân giữa Notion và Trello. Notion thì tuỳ biến cao nhưng hơi mất thời gian setup, Trello thì đơn giản hơn nhưng đôi khi thiếu tính năng ghi chú sâu.",
    favoriteCount: 452,
    commentCount: 128,
    isFavorited: false,
    isSaved: true,
    createdAt: "2026-02-10T10:00:00Z",
  },
  {
    id: 1,
    author: {
      id: 4,
      name: "SkillSnap Official",
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      role: "COMPANY",
    },
    description:
      "Chia sẻ một portfolio UI/UX nổi bật trong tuần trên SkillSnap.",
    portfolioId: 21,
    portfolioPreview: {
      type: "PROJECT",
      variant: "PROJECTONE",
      data: {
        title: "Mobile Banking UX Redesign",
        coverImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
        description:
          "Thiết kế lại trải nghiệm người dùng cho ứng dụng ngân hàng di động.",
      },
    },
    favoriteCount: 830,
    commentCount: 54,
    isFavorited: false,
    isSaved: true,
    createdAt: "2026-03-12T14:30:00Z",
  },
];

export const fetchSavedJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(demoJobs.filter((job) => job.isSaved));
    }, 300);
  });
};

export const fetchCommunity = async (): Promise<CommunityPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(community);
    }, 10);
  });
};
