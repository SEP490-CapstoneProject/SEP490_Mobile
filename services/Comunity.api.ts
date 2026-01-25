export interface CommunityPost {
  id: number;
  author: {
    id: number;
    name: string;
    avatar: string;
    role: "COMPANY" | "USER";
  };
  description: string;
  media: string[];
  link?: string;

  favoriteCount: number;
  commentCount: number;

  isFavorited: boolean;
  isSaved: boolean;
  createdAt: string;
}

export interface CommentUser {
  id: number;
  name: string;
  avatar: string;
  role: "COMPANY" | "USER";
}

export interface ReplyComment {
  id: number;
  author: CommentUser;
  replyToUser: CommentUser;
  content: string;
  createdAt: string;
}

export interface PostComment {
  id: number;
  author: CommentUser;
  content: string;
  createdAt: string;
  replies: ReplyComment[];
}

export interface PostCommentsResponse {
  postId: number;
  comments: PostComment[];
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
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    ],
    link: "https://careers.google.com/jobs",
    favoriteCount: 25,
    commentCount: 25, // ✅
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
    commentCount: 12, // ✅
    isFavorited: true,
    isSaved: false,
    createdAt: "2026-01-05T09:00:00",
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
    media: [],
    link: "https://www.figma.com/file/example-ui-case-study",
    favoriteCount: 12,
    commentCount: 0, // ✅ chưa ai comment
    isFavorited: false,
    isSaved: true,
    createdAt: "2026-01-04T14:10:00",
  },
];

export const fetchCommunityPosts = async (): Promise<CommunityPost[]> => {
  return COMMUNITY_POSTS_MOCK;
};

export const POST_COMMENTS_MOCK: PostCommentsResponse[] = [
  {
    postId: 1,
    comments: [
      {
        id: 1,
        author: {
          id: 201,
          name: "Phạm Cường",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          role: "COMPANY",
        },
        content: "Vị trí này có nhận remote không ạ?",
        createdAt: "2026-01-05T09:10:00",
        replies: [
          {
            id: 11,
            author: {
              id: 101,
              name: "Google Inc.",
              avatar: "https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg",
              role: "COMPANY",
            },
            replyToUser: {
              id: 201,
              name: "Phạm Cường",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              role: "USER",
            },
            content: "Hiện tại bên mình ưu tiên onsite bạn nhé.",
            createdAt: "2026-01-05T09:20:00",
          },
          {
            id: 12,
            author: {
              id: 101,
              name: "Google Inc.",
              avatar: "https://img.timviec.com.vn/2020/10/cong-ty-google-1.jpg",
              role: "COMPANY",
            },
            replyToUser: {
              id: 201,
              name: "Phạm Cường",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              role: "USER",
            },
            content: "Hiện tại bên mình ưu tiên onsite bạn nhé.",
            createdAt: "2026-01-24T06:20:00",
          },
        ],
      },
      {
        id: 2,
        author: {
          id: 202,
          name: "Nguyễn Minh",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
          role: "COMPANY",
        },
        content:
          "Mức lương cho Senior khoảng bao nhiêu vậy ạ? Mức lương cho Senior khoảng bao nhiêu vậy ạ?",
        createdAt: "2026-01-05T09:15:00",
        replies: [],
      },
    ],
  },

  {
    postId: 2,
    comments: [
      {
        id: 4,
        author: {
          id: 301,
          name: "Lê Thảo",
          avatar: "https://randomuser.me/api/portraits/women/65.jpg",
          role: "USER",
        },
        content: "Portfolio nhìn rất xịn 👍",
        createdAt: "2026-01-05T10:05:00",
        replies: [
          {
            id: 21,
            author: {
              id: 201,
              name: "Phạm Cường",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              role: "USER",
            },
            replyToUser: {
              id: 301,
              name: "Lê Thảo",
              avatar: "https://randomuser.me/api/portraits/women/65.jpg",
              role: "USER",
            },
            content: "Cảm ơn bạn nhiều nha 🙏",
            createdAt: "2026-01-05T10:08:00",
          },
        ],
      },
    ],
  },

  {
    postId: 3,
    comments: [
      {
        id: 7,
        author: {
          id: 401,
          name: "Trần Huy",
          avatar: "https://randomuser.me/api/portraits/men/77.jpg",
          role: "USER",
        },
        content: "Sinh viên năm cuối apply được không?",
        createdAt: "2026-01-04T16:45:00",
        replies: [
          {
            id: 31,
            author: {
              id: 102,
              name: "FPT Software",
              avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNrth9D12U-w1YDVelzT5eSzetDjf_zGJ4Q&s",
              role: "COMPANY",
            },
            replyToUser: {
              id: 401,
              name: "Trần Huy",
              avatar: "https://randomuser.me/api/portraits/men/77.jpg",
              role: "USER",
            },
            content: "Apply thoải mái nha em.",
            createdAt: "2026-01-04T16:55:00",
          },
        ],
      },
    ],
  },
];

export const fetchPostDetail = async (
  postId: number,
): Promise<CommunityPost | null> => {
  return COMMUNITY_POSTS_MOCK.find((p) => p.id === postId) ?? null;
};

export const fetchPostComments = async (
  postId: number,
): Promise<PostCommentsResponse> => {
  return (
    POST_COMMENTS_MOCK.find((p) => p.postId === postId) ?? {
      postId,
      comments: [],
    }
  );
};
