import { demoJobs, demoJobsDetail, Job, JobDetail } from "./home.api";

export type CompanyJobPost = {
  postId: number;
  companyId: number;
  position: string;
  mediaType: string;
  mediaUrl: string;
};

const demoCompanyJobPosts: CompanyJobPost[] = [
  {
    postId: 1,
    companyId: 1,
    position: "Senior UX Designer",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  },
  {
    postId: 2,
    companyId: 1,
    position: "Frontend Developer (React)",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    postId: 3,
    companyId: 1,
    position: "Backend Developer (NodeJS)",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    postId: 4,
    companyId: 1,
    position: "Mobile Developer (React Native)",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
];

export const fetchCompanyJobPostsByCompanyId = async (
  companyId: number,
): Promise<CompanyJobPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        demoCompanyJobPosts.filter((post) => post.companyId === companyId),
      );
    }, 30);
  });
};

export const fetchCompanyJobPostByPostId = async (
  postId: number,
): Promise<Job | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = demoJobs.find((p) => p.postId === postId);
      resolve(post || null);
    }, 30);
  });
};

export const fetchJobDetailById = async (
  postId: number,
): Promise<JobDetail | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const jobDetail = demoJobsDetail.find((j) => j.postId === postId);
      resolve(jobDetail || null);
    }, 30);
  });
};
