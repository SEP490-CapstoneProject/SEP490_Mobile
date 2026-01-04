export type Job = {
  postId: number;
  position: string;
  companyName: string;

  companyAvatar: string;  

  mediaType: "image" | "video";
  mediaUrl: string;

  address: string;
  salary: string;
  employmentType: string;

  isFavorited: boolean;
  isSaved: boolean;
};


export type JobDetail = {
  postId: number;
  companyId: number;

  position: string;
  companyName: string;
  companyAvatar: string;

  mediaType: "image" | "video";
  mediaUrl: string;

  address: string;
  salary: string;
  employmentType: "Full-time" | "Part-time" | "Remote" | "Internship";
  experienceYear: number;
  quantity: number;

  jobDescription: string;
  requirementsMandatory: string;
  requirementsPreferred: string;
  benefits: string;

  createdAt: string;
  status: number;

  isFavorited: boolean;
  isSaved: boolean;
};


const demoJobs: Job[] = [
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
    isSaved: false,
  },
    {
    postId: 3,
    position: "Frontend Developer",
    companyName: "FPT Software",
    companyAvatar:
      "https://gobranding.com.vn/wp-content/uploads/2023/06/9-photographer-la-gi.jpg",

    mediaType: "image",
    mediaUrl: "https://i.pinimg.com/736x/15/d8/ba/15d8ba4e29cbf24cf18d26cb1175829d.jpg",

    address: "Quận 7, Hồ Chí Minh",
    salary: "18.000.000 - 25.000.000",
    employmentType: "Full-time",

    isFavorited: true,
    isSaved: false,
  },
];

const demoJobsDetail: JobDetail[] = [
  {
    postId: 1,
    companyId: 101,

    position: "Senior UX Designer",
    companyName: "Google Inc.",
    companyAvatar:
      "https://itplus-academy.edu.vn/upload/c47d9c29fc44c2b7996a2613aec3c1f9/files/7.jpg",

    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c",

    address: "Quận 7, Hồ Chí Minh",
    salary: "18.000.000 - 25.000.000",
    employmentType: "Full-time",
    experienceYear: 2,
    quantity: 3,

    jobDescription:
      "Tham gia phát triển các ứng dụng web sử dụng React, phối hợp với UI/UX và Backend team.",
    requirementsMandatory:
      "React, JavaScript, HTML, CSS",
    requirementsPreferred:
      "TypeScript, Next.js, Tailwind",
    benefits:
      "Lương tháng 13, bảo hiểm full, làm việc hybrid",

    createdAt: "2024-10-01",
    status: 1,

    isFavorited: true,
    isSaved: false,
  },

  {
    postId: 2,
    companyId: 102,

    position: "Backend Developer (NodeJS)",
    companyName: "VNG Corporation",
    companyAvatar:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/VNG_logo.png",

    mediaType: "video",
    mediaUrl:
      "https://www.w3schools.com/html/mov_bbb.mp4",

    address: "Quận 1, Hồ Chí Minh",
    salary: "20.000.000 - 30.000.000",
    employmentType: "Full-time",
    experienceYear: 3,
    quantity: 2,

    jobDescription:
      "Xây dựng REST API, microservices, làm việc với hệ thống lớn.",
    requirementsMandatory:
      "NodeJS, Express, MongoDB",
    requirementsPreferred:
      "Docker, AWS, Redis",
    benefits:
      "Remote 2 ngày/tuần, thưởng dự án, môi trường trẻ",

    createdAt: "2024-10-03",
    status: 1,

    isFavorited: false,
    isSaved: true,
  },

  {
    postId: 3,
    companyId: 103,

    position: "Mobile Developer (React Native)",
    companyName: "Tiki Corporation",
    companyAvatar:
      "https://upload.wikimedia.org/wikipedia/commons/7/7b/Tiki_logo.png",

    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",

    address: "Thủ Đức, Hồ Chí Minh",
    salary: "15.000.000 - 22.000.000",
    employmentType: "Remote",
    experienceYear: 1,
    quantity: 1,

    jobDescription:
      "Phát triển ứng dụng mobile thương mại điện tử bằng React Native.",
    requirementsMandatory:
      "React Native, REST API",
    requirementsPreferred:
      "Expo, Firebase",
    benefits:
      "Remote 100%, hỗ trợ thiết bị làm việc",

    createdAt: "2024-10-05",
    status: 1,

    isFavorited: false,
    isSaved: false,
  },
];




export const fetchJobs = async (): Promise<Job[]> => {
  return demoJobs;
};


export const fetchJobById = async (postId: number): Promise<JobDetail | null> => {
  const jobDetail = demoJobsDetail.find((j) => j.postId === postId);
  return jobDetail ?? null;
};
