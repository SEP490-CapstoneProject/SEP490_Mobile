import { CommunityPost } from "../Comunity.api";
import { PortfolioBlock } from "../portfolio.api";

export type FollowPortfolio = {
  followId: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
  followedAt: string;

  isUpdated: boolean;
  updateInfo?: string;

  portfolioId: number;
  userId: number;
  blocks: PortfolioBlock;
};

const portfolio: FollowPortfolio[] = [
  {
    followId: 1,
    priority: "HIGH",
    followedAt: "2026-03-12",

    isUpdated: true,
    updateInfo: "Hồ sơ này mới cập nhật",

    portfolioId: 20,
    userId: 2,

    blocks: {
      id: 201,
      type: "INTRO",
      variant: "INTROTWO",
      order: 1,
      data: {
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Phạm An Nhiên",
        studyField: "Frontend Intern",
        schoolYear: 3,
        school: "Đại học FPT",
        department: "Kỹ sư phần mềm",
        email: "annhien@gmail.com",
        phone: "0123456789",
      },
    },
  },

  {
    followId: 2,
    priority: "LOW",
    followedAt: "2026-03-10",

    isUpdated: false,

    portfolioId: 25,
    userId: 5,

    blocks: {
      id: 301,
      type: "INTRO",
      variant: "INTROTHREE",
      order: 1,
      data: {
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "Phạm An Nhiên",
        school: "Đại học FPT",
        department: "Khoa CNTT - Kỹ thuật phần mềm",
        gpa: 3.9,
      },
    },
  },

  {
    followId: 3,
    priority: "MEDIUM",
    followedAt: "2026-03-09",

    isUpdated: true,
    updateInfo: "Portfolio đã thêm dự án mới",

    portfolioId: 27,
    userId: 7,

    blocks: {
      id: 401,
      type: "INTRO",
      variant: "INTROTWO",
      order: 1,
      data: {
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
        name: "Trần Quốc Bảo",
        studyField: "Backend Developer",
        schoolYear: 4,
        school: "Đại học CNTT",
        department: "Khoa học máy tính",
        email: "quocbao@gmail.com",
        phone: "0912345678",
      },
    },
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

export const fetchFollowedPortfolios = async (): Promise<FollowPortfolio[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(portfolio);
    }, 10);
  });
};

export const fetchCommunity = async (): Promise<CommunityPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(community);
    }, 10);
  });
};
