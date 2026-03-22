export type Application = {
  applicationId: number;
  status: "WAITING" | "REVIEWING" | "ACCEPTED" | "INTERVIEW" | "REJECTED";
  appliedAt: string;
  post: Post;
  company: Company;
  interview?: Interview;
};

export type Post = {
  postId: number;
  position: string;
  salary: string;
  address: string;
  media: string;
};

export type Company = {
  companyId: number;
  companyName: string;
  logo: string;
};

export type Interview = {
  time: string;
  date: string;
  type: string;
};

export const APPLICATIONS_MOCK: Application[] = [
  {
    applicationId: 1,
    status: "REVIEWING",
    appliedAt: "2026-03-24",
    post: {
      postId: 501,
      position: "Senior UI/UX Designer",
      salary: "1000$ - 1500$",
      address: "HCM",
      media: "",
    },
    company: {
      companyId: 10,
      companyName: "TechNova Solutions",
      logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
  },
  {
    applicationId: 2,
    status: "ACCEPTED",
    appliedAt: "2026-03-20",
    post: {
      postId: 502,
      position: "Frontend Developer",
      salary: "",
      address: "",
      media: "",
    },
    company: {
      companyId: 11,
      companyName: "SkillSnap Studio",
      logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
  },
  {
    applicationId: 3,
    status: "INTERVIEW",
    appliedAt: "2026-03-15",
    post: {
      postId: 503,
      position: "Product Designer",
      salary: "",
      address: "",
      media: "",
    },
    company: {
      companyId: 12,
      companyName: "Creative Pulse",
      logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    interview: {
      time: "14:30",
      date: "2026-03-20",
      type: "Online",
    },
  },
  {
    applicationId: 4,
    status: "REJECTED",
    appliedAt: "2026-03-10",
    post: {
      postId: 504,
      position: "Visual Identity Artist",
      salary: "",
      address: "",
      media: "",
    },
    company: {
      companyId: 13,
      companyName: "Global Connect",
      logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
  },
];

export const fetchApplications = async (): Promise<Application[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(APPLICATIONS_MOCK);
    }, 500);
  });
};
