export type PortfolioBlock = {
  id: number;
  type: string;
  variant: string;
  order: number;
  data: any;
};

export type PortfolioResponse = {
  profileId: number;
  userId: number;
  blocks: PortfolioBlock[];
};

export const PORTFOLIO_MOCK: PortfolioResponse = {
  profileId: 12,
  userId: 2,
  blocks: [
    {
      id: 101,
      type: "INTRO",
      variant: "INTROONE",
      order: 1,
      data: {
        avatar: "https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg",
        fullName: "Phạm An Nhiên",
        title: "Frontend Developer",
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
          school: "Đại học Bách khoa Hà Nội",
          time: "2016 - 2020",
          major: "Công nghệ thông tin",
          description:
            "2 năm kinh nghiệm React Native, xây dựng UI/UX hiện đại cho mobile app.",
        },
        {
          school: "FPT Academy",
          time: "2014 - 2016",
          major: "Lập trình Web",
          description:
            "2 năm kinh nghiệm React Native, xây dựng UI/UX hiện đại cho mobile app.",
        },
      ],
    },
    {
      id: 104,
      type: "CERTIFICATE",
      variant: "CERTIFICATEONE",
      order: 4,
      data: [
        {
          name: "Chứng chỉ chuyên môn về thiết kế UX",
          issuer: "Google",
          year: "2021",
          link: "https://docs.google.com/spreadsheets/d/1xevarW6Ec4vihD_03VhIKKX5Npja8YgBLFRCoDSLJOE/edit?gid=0#gid=0",
        },
        {
          name: "Meta Frontend Developer Certificate",
          issuer: "Meta",
          year: "2022",
          link: "https://docs.google.com/spreadsheets/d/1xevarW6Ec4vihD_03VhIKKX5Npja8YgBLFRCoDSLJOE/edit?gid=0#gid=0",
        },
      ],
    },
    {
      id: 105,
      type: "EXPERIENCE",
      variant: "EXPERIENCEONE",
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
            "Thiết kế giao diện người dùng và trải nghiệm người dùng cho ứng dụng ngân hàng di động hiện đại, tập trung vào sự đơn giản và bảo mật.",
          role: "Frontend Developer",
          technology: "React Native, Node.js",
          projectLinks: [
            {
              type: "github",
              link: "https://github.com/username/omnibank-app",
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
        {
          image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
          name: "Ứng dụng OmniBank Admin",
          description:
            "Trang quản trị hệ thống ngân hàng, hỗ trợ quản lý người dùng, giao dịch và báo cáo.",
          role: "Frontend Developer",
          technology: "React, Ant Design",
          projectLinks: [
            {
              type: "github",
              link: "https://github.com/username/omnibank-admin",
            },
            {
              type: "figma",
              link: "https://figma.com/file/omnibank-admin-ui",
            },
            {
              type: "web",
              link: "https://admin.omnibank.vn",
            },
          ],
        },
      ],
    },
    {
      id: 107,
      type: "ACHIEVEMENT",
      variant: "ACHIEVEMENTONE",
      order: 7,
      data: [
        {
          name: "Best employee of the year",
          date: "2022-01-01",
          organization: "Công ty ABC",
          description: "Nhân viên xuất sắc nhất năm 2022.",
        },
        {
          name: "Giải nhì Hackathon Việt Nam",
          date: "2021-01-01",
          organization: "Ban tổ chức Hackathon Việt Nam",
          description: "Đạt giải nhì tại cuộc thi Hackathon Việt Nam năm 2021.",
        },
      ],
    },
    {
      id: 108,
      type: "ACTIVITY",
      variant: "ACTIVITYONE",
      order: 8,
      data: [
        {
          name: "Diễn giả tại TechMeetup Hà Nội",
          date: "2022-01-01",
          description:
            "Tham gia chia sẻ kinh nghiệm và kiến thức công nghệ tại TechMeetup Hà Nội.",
        },
        {
          name: 'Tình nguyện viên "Máy tính cho em"',
          date: "2021-01-01",
          description:
            "Tham gia chương trình thiện nguyện hỗ trợ máy tính cho học sinh có hoàn cảnh khó khăn.",
        },
      ],
    },
    {
      id: 109,
      type: "OTHER",
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
        {
          name: "Trần Thị B",
          position: "Product Manager",
          mail: "thib@startupabc.com",
          phone: "0912345678",
        },
      ],
    },
  ],
};

export const fetchPortfolioByUser = async (userId: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PORTFOLIO_MOCK), 300);
  });
};
