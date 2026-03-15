export type ApplicationManager = {
  applicationId: number;
  status: "NEW" | "REVIEWING" | "ACCEPTED" | "INTERVIEW" | "REJECTED";
  appliedAt: string;

  portfolioId: number;
  roomId: number;

  candidate: {
    userId: number;
    name: string;
    avatar: string;
  };

  post: {
    postId: number;
    position: string;
    media: string;
  };

  interview?: {
    time: string;
    date: string;
    type: string;
  };
};

const community: ApplicationManager[] = [
  {
    applicationId: 1,
    status: "NEW",
    appliedAt: "2026-01-05T08:30:00",

    portfolioId: 301,
    roomId: 701,

    candidate: {
      userId: 12,
      name: "Phạm An Nhiên",
      avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },

    post: {
      postId: 501,
      position: "Senior UX/UI designer",
      media: "https://images.unsplash.com/photo-1551434678-e076c223a692",
    },
  },

  {
    applicationId: 2,
    status: "REVIEWING",
    appliedAt: "2026-01-05T08:30:00",

    portfolioId: 302,
    roomId: 702,

    candidate: {
      userId: 13,
      name: "Lê Minh Đức",
      avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },

    post: {
      postId: 501,
      position: "Senior UX/UI designer Senior UX/UI designer",
      media: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
  },

  {
    applicationId: 3,
    status: "ACCEPTED",
    appliedAt: "2026-01-05T08:30:00",

    portfolioId: 303,
    roomId: 703,

    candidate: {
      userId: 14,
      name: "Trần Thu Thủy",
      avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },

    post: {
      postId: 501,
      position: "Senior UX/UI designer ",
      media: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
    },
  },

  {
    applicationId: 4,
    status: "INTERVIEW",
    appliedAt: "2026-01-05T08:30:00",

    portfolioId: 304,
    roomId: 704,

    candidate: {
      userId: 15,
      name: "Nguyễn Thu Hà",
      avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },

    post: {
      postId: 501,
      position: "Senior UX/UI designer",
      media: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },

    interview: {
      time: "14:30",
      date: "20/03/2026",
      type: "ONLINE",
    },
  },
];

export const fetchApplications = async (): Promise<ApplicationManager[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(community);
    }, 50);
  });
};
