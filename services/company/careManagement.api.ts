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

export const fetchFollowedPortfolios = async (): Promise<FollowPortfolio[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(portfolio);
    }, 10);
  });
};
