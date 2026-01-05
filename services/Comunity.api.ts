
export interface CommunityPost {
  id: number
  author: {
    id: number
    name: string
    avatar: string
    role: "COMPANY" | "USER"
  }
  description: string
  media: string[]
  link?: string  
  favoriteCount: number
  isFavorited: boolean
  isSaved: boolean
  createdAt: string
}


export const COMMUNITY_POSTS_MOCK: CommunityPost[] = [
  {
    id: 1,
    author: {
      id: 101,
      name: "Google Inc.",
      avatar: "https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg",
      role: "COMPANY",
    },
    description:
      "Chúng tôi đang tìm kiếm 5 ứng viên Senior UX/UI Designer với mức lương và đãi ngộ hấp dẫn.",
    media: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    ],
    link: "https://careers.google.com/jobs",
    favoriteCount: 25,
    isFavorited: false,
    isSaved: true,
    createdAt: "2026-01-05T08:30:00",
  },

  {
    id: 2,
    author: {
      id: 201,
      name: "Phạm Cường",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "USER",
    },
    description:
      "Mình đang tìm dự án freelance web/mobile. Đây là một số sản phẩm mình đã làm gần đây 👇",
    media: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    ],
    favoriteCount: 48,
    isFavorited: true,
    isSaved: false,
    createdAt: "2026-01-05T09:00:00",
  },

  {
    id: 3,
    author: {
      id: 102,
      name: "FPT Software",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNrth9D12U-w1YDVelzT5eSzetDjf_zGJ4Q&s",
      role: "COMPANY",
    },
    description:
      "FPT Software tuyển Fresher Mobile Developer – cơ hội dành cho sinh viên mới ra trường.",
    media: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    ],
    link: "https://fptsoftware.com/careers",
    favoriteCount: 19,
    isFavorited: false,
    isSaved: false,
    createdAt: "2026-01-04T16:20:00",
  },

  {
    id: 4,
    author: {
      id: 202,
      name: "Nguyễn Thảo",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      role: "USER",
    },
    description:
      "Chia sẻ một case study UI cho app bán hàng mình vừa hoàn thành. Link Figma mình để bên dưới nhé.",
    media: [],   // ❌ KHÔNG CÓ ẢNH
    link: "https://www.figma.com/file/example-ui-case-study",
    favoriteCount: 12,
    isFavorited: false,
    isSaved: true,
    createdAt: "2026-01-04T14:10:00",
  },

  {
    id: 5,
    author: {
      id: 103,
      name: "Microsoft Vietnam",
      avatar: "https://cdn.tgdd.vn/Files/2017/03/08/958563/microsoft_1024x576.jpg",
      role: "COMPANY",
    },
    description:
      "Chúng tôi đang tìm kiếm Backend Engineer (.NET / Cloud).",
    media: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    ],
    favoriteCount: 31,
    isFavorited: true,
    isSaved: true,
    createdAt: "2026-01-03T10:00:00",
  },
];



export const fetchCommunityPosts = async (): Promise<CommunityPost[]> => {
  return COMMUNITY_POSTS_MOCK;
};
