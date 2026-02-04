export type PortfolioBlock = {
  id: number;
  type: string;
  variant: string;
  order: number;
  data: any;
};

export type PortfolioResponse = {
  portfolioId: number;
  userId: number;
  blocks: PortfolioBlock[];
};

export type PortfolioMainBlockItem = {
  portfolioId: number;
  userId: number;
  portfolio: {
    name: string;
    status: number;
  };
  blocks: PortfolioBlock;
};

export const PORTFOLIO_MOCK: PortfolioResponse[] = [
  {
    portfolioId: 12,
    userId: 2,
    blocks: [
      {
        id: 101,
        type: "INTRO",
        variant: "INTROONE",
        order: 1,
        data: {
          avatar: "https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg",
          name: "Phạm An Nhiên",
          studyField: "Frontend Developer",
          description:
            "2 năm kinh nghiệm React Native, xây dựng UI/UX hiện đại cho mobile app.",
          email: "quyenttse170347@fpt.edu.vn",
          phone: "0123456789",
        },
      },

      {
        id: 102,
        type: "SKILL",
        variant: "SKILLONE",
        order: 2,
        data: [
          { name: "JavaScript" },
          { name: "React" },
          { name: "React Native" },
          { name: "Figma" },
          { name: "Git" },
        ],
      },

      {
        id: 103,
        type: "EDUCATION",
        variant: "EDUCATIONONE",
        order: 3,
        data: [
          {
            schoolName: "Đại học Bách khoa Hà Nội",
            time: "2016 - 2020",
            department: "Công nghệ thông tin",
            description:
              "Chương trình đào tạo kỹ sư CNTT, nền tảng lập trình vững chắc.",
          },
          {
            schoolName: "FPT Academy",
            time: "2014 - 2016",
            department: "Lập trình Web",
            description: "Đào tạo thực hành chuyên sâu về lập trình web.",
          },
        ],
      },

      {
        id: 104,
        type: "DIPLOMA",
        variant: "DIPLOMAONE",
        order: 4,
        data: [
          {
            name: "Chứng chỉ chuyên môn về thiết kế UX",
            provider: "Google",
            date: "2021-01-01",
            link: "https://docs.google.com/spreadsheets/d/1xevarW6Ec4vihD_03VhIKKX5Npja8YgBLFRCoDSLJOE",
          },
          {
            name: "Meta Frontend Developer Certificate",
            provider: "Meta",
            date: "2022-01-01",
            link: "https://docs.google.com/spreadsheets/d/1xevarW6Ec4vihD_03VhIKKX5Npja8YgBLFRCoDSLJOE",
          },
        ],
      },

      {
        id: 105,
        type: "EXPERIMENT",
        variant: "EXPERIMENTONE",
        order: 5,
        data: [
          {
            jobName: "Frontend Developer",
            address: "Tech Việt",
            startDate: "2021",
            endDate: "2023",
            description: "Phát triển sản phẩm cho các doanh nghiệp vừa và nhỏ.",
          },
          {
            jobName: "React Native Developer",
            address: "Startup ABC",
            startDate: "2020",
            endDate: "2021",
            description: "Xây dựng ứng dụng mobile thương mại điện tử.",
          },
        ],
      },

      {
        id: 106,
        type: "PROJECT",
        variant: "PROJECTONE",
        order: 6,
        data: [
          {
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
            name: "Ứng dụng ngân hàng số OmniBank",
            description:
              "Thiết kế UI/UX và frontend cho ứng dụng ngân hàng di động.",
            role: "Frontend Developer",
            technology: "React Native, Node.js",
            links: [
              {
                type: "github",
                link: "https://github.com/username/omnibank-app",
              },
              { type: "figma", link: "https://figma.com/file/omnibank-ui" },
              {
                type: "app",
                link: "https://play.google.com/store/apps/details?id=omnibank",
              },
            ],
          },
        ],
      },

      {
        id: 107,
        type: "AWARD",
        variant: "AWARDONE",
        order: 7,
        data: [
          {
            name: "Best employee of the year",
            date: "2022-01-01",
            organization: "Công ty ABC",
            description: "Nhân viên xuất sắc nhất năm 2022.",
          },
        ],
      },

      {
        id: 108,
        type: "ACTIVITIES",
        variant: "ACTIVITYONE",
        order: 8,
        data: [
          {
            name: "Diễn giả tại TechMeetup Hà Nội",
            date: "2022-01-01",
            description: "Chia sẻ kinh nghiệm và kiến thức công nghệ.",
          },
        ],
      },

      {
        id: 109,
        type: "OTHERINFO",
        variant: "OTHERONE",
        order: 9,
        data: [
          { detail: "Đọc sách" },
          { detail: "Chạy bộ" },
          { detail: "Du lịch" },
        ],
      },

      {
        id: 110,
        type: "REFERENCE",
        variant: "REFERENCEONE",
        order: 10,
        data: [
          {
            name: "Nguyễn Văn A",
            position: "Tech Lead",
            mail: "vana@techviet.com",
            phone: "0901234567",
          },
        ],
      },
    ],
  },
  {
    portfolioId: 20,
    userId: 2,
    blocks: [
      {
        id: 201,
        type: "INTRO",
        variant: "INTRO_STUDENT",
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

      {
        id: 202,
        type: "OTHERINFO",
        variant: "CAREER_GOAL",
        order: 2,
        data: {
          detail:
            "Một nhà thiết kế sản phẩm đầy nhiệt huyết với hơn 5 năm kinh nghiệm. Tôi tập trung vào việc tạo ra những trải nghiệm người dùng trực quan, đẹp mắt và giải quyết các vấn đề phức tạp bằng các giải pháp thiết kế lấy con người làm trung tâm.",
        },
      },

      {
        id: 203,
        type: "SKILL",
        variant: "SKILL_BASE",
        order: 3,
        data: {
          languages: ["JavaScript", "TypeScript"],
          frameworks: ["React JS", "Tailwind CSS"],
          tools: ["Figma", "Github", "Postman"],
        },
      },

      {
        id: 204,
        type: "PROJECT",
        variant: "PROJECT_APP",
        order: 4,
        data: [
          {
            image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
            name: "Ứng dụng ngân hàng số OmniBank",
            description:
              "Thiết kế giao diện người dùng và trải nghiệm người dùng cho ứng dụng ngân hàng di động hiện đại, tập trung vào sự đơn giản và bảo mật.",
            role: "Thiết kế UI, Frontend Developer",
            technology: "Figma, ReactJS, TypeScript",
            links: [
              {
                type: "github",
                link: "https://github.com/example/omnibank",
              },
              {
                type: "figma",
                link: "https://figma.com/file/omnibank-ui",
              },
              {
                type: "app",
                link: "https://play.google.com/store/apps/details?id=omnibank",
              },
            ],
          },
        ],
      },

      {
        id: 205,
        type: "EDUCATION",
        variant: "EDU_BASIC",
        order: 5,
        data: [
          {
            schoolName: "Đại học FPT",
            time: "2016 - 2020",
            department: "Kỹ sư phần mềm",
            description:
              "Môn tiêu biểu: Data Structures, Web Design, Database System",
            gpa: "3.6/4.0",
          },
        ],
      },

      {
        id: 206,
        type: "ACTIVITIES",
        variant: "ACTIVITYONE",
        order: 6,
        data: [
          {
            name: "Top 5 Hackathon EduTech",
            date: "2022-08-01",
            description:
              "Chia sẻ về chủ đề “Xây dựng Design System hiệu quả cho Startup”.",
          },
        ],
      },

      {
        id: 207,
        type: "DIPLOMA",
        variant: "DIPLOMAONE",
        order: 7,
        data: [
          {
            name: "Chứng chỉ chuyên môn về thiết kế UX của Google",
            provider: "Coursera",
            date: "2021-01-01",
            link: "https://coursera.org",
          },
          {
            name: "Meta Frontend Developer Certificate",
            provider: "Meta",
            date: "2022-01-01",
            link: "https://meta.com",
          },
        ],
      },

      {
        id: 208,
        type: "SKILL",
        variant: "SKILL_SOFT",
        order: 8,
        data: [
          { name: "Làm việc nhóm" },
          { name: "Giao tiếp" },
          { name: "Quản lý thời gian" },
          { name: "Tự nghiên cứu" },
        ],
      },

      {
        id: 209,
        type: "OTHERINFO",
        variant: "HOBBY",
        order: 9,
        data: [
          { detail: "Bóng đá" },
          { detail: "Nghe nhạc" },
          { detail: "Đọc truyện" },
        ],
      },
      {
        id: 210,
        type: "REFERENCE",
        variant: "REFERENCEONE",
        order: 10,
        data: [
          {
            name: "Nguyễn Thị Minh Hằng",
            position: "Head of Marketing",
            mail: "hang.nguyen@gmail.com",
            phone: "0988 123 456",
          },
        ],
      },
    ],
  },
];

export const PORTFOLIO_MOCK_Main_Block: PortfolioMainBlockItem = {
  portfolioId: 12,
  userId: 2,
  portfolio: {
    name: "Portfolio Frontend Developer",
    status: 1,
  },
  blocks: {
    id: 101,
    type: "INTRO",
    variant: "INTROONE",
    order: 1,
    data: {
      avatar: "https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg",
      name: "Phạm An Nhiên",
      department: "Frontend Developer",
      description:
        "2 năm kinh nghiệm React Native, xây dựng UI/UX hiện đại cho mobile app.",
      email: "quyenttse170347@fpt.edu.vn",
      phone: "0123456789",
    },
  },
};

export const PORTFOLIO_LIST_MOCK: PortfolioMainBlockItem[] = [
  {
    portfolioId: 12,
    userId: 2,
    portfolio: {
      name: "Portfolio Frontend Developer",
      status: 1,
    },
    blocks: PORTFOLIO_MOCK_Main_Block.blocks,
  },

  {
    portfolioId: 13,
    userId: 2,
    portfolio: {
      name: "Portfolio Mobile Developer",
      status: 0,
    },
    blocks: {
      id: 201,
      type: "INTRO",
      variant: "INTROONE",
      order: 1,
      data: {
        avatar: "https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg",
        name: "hihihaha",
        department: "Frontend Developer",
        description:
          "2 năm kinh nghiệm React Native, xây dựng UI/UX hiện đại cho mobile app.",
        email: "quyenttse170347@fpt.edu.vn",
        phone: "0123456789",
      },
    },
  },
];

export const fetchPortfolio = async (userId: number, portfolioId: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PORTFOLIO_MOCK), 1);
  });
};

export const fetchPortfolioById = async (portfolioId: number) => {
  return new Promise<PortfolioResponse | undefined>((resolve) => {
    setTimeout(() => {
      resolve(PORTFOLIO_MOCK.find((p) => p.portfolioId === portfolioId));
    }, 1);
  });
};

export const fetchMainBlockPortfolioByUserId = async (userId: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PORTFOLIO_MOCK_Main_Block), 1);
  });
};

export const fetchMainPortfoliosManagerByUser = async (
  userId: number,
): Promise<PortfolioMainBlockItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PORTFOLIO_LIST_MOCK.filter((p) => p.userId === userId));
    }, 1);
  });
};
