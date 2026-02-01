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
      variant: "TIMELINE",
      order: 5,
      data: [
        {
          company: "Tech Việt",
          position: "Frontend Developer",
          startYear: 2021,
          endYear: 2023,
          description: "Phát triển sản phẩm cho các doanh nghiệp vừa và nhỏ.",
        },
        {
          company: "Startup ABC",
          position: "React Native Developer",
          startYear: 2020,
          endYear: 2021,
          description: "Xây dựng ứng dụng mobile thương mại điện tử.",
        },
      ],
    },
    {
      id: 106,
      type: "PROJECT",
      variant: "GRID",
      order: 6,
      data: [
        {
          name: "Ứng dụng ngân hàng số OmniBank",
          description: "Ứng dụng ngân hàng số cho người dùng trẻ.",
          technology: ["React Native", "Node.js"],
          role: "Frontend Developer",
        },
        {
          name: "Ứng dụng OmniBank Admin",
          description: "Trang quản trị hệ thống ngân hàng.",
          technology: ["React", "Ant Design"],
          role: "Frontend Developer",
        },
      ],
    },
    {
      id: 107,
      type: "AWARD",
      variant: "LIST",
      order: 7,
      data: [
        { title: "Best employee of the year", year: 2022 },
        { title: "Giải nhì Hackathon Việt Nam", year: 2021 },
      ],
    },
    {
      id: 108,
      type: "ACTIVITY",
      variant: "LIST",
      order: 8,
      data: [
        { name: "Diễn giả tại TechMeetup Hà Nội", year: 2022 },
        { name: 'Tình nguyện viên "Máy tính cho em"', year: 2021 },
      ],
    },
    {
      id: 109,
      type: "HOBBY",
      variant: "CHIP",
      order: 9,
      data: ["Đọc sách", "Chạy bộ", "Du lịch"],
    },
    {
      id: 110,
      type: "REFERENCE",
      variant: "CARD",
      order: 10,
      data: [
        {
          name: "Nguyễn Văn A",
          position: "Tech Lead",
          company: "Tech Việt",
          contact: "vana@techviet.com",
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
