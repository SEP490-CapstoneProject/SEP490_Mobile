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

export const fetchJobs = async (): Promise<Job[]> => {
  return demoJobs;
};
