import { create } from "zustand";

type Post = any;

type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[] | ((prev: Post[]) => Post[])) => void;

  updateCommentCount: (postId: number) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],

  setPosts: (posts) =>
    set((state) => ({
      posts: typeof posts === "function" ? posts(state.posts) : posts,
    })),

  updateCommentCount: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, commentCount: (p.commentCount || 0) + 1 } : p,
      ),
    })),
}));
