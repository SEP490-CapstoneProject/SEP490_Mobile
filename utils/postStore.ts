import { create } from "zustand";

type Post = any;

type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[] | ((prev: Post[]) => Post[])) => void;

  updateCommentCount: (postId: number) => void;
  toggleFavorite: (postId: number) => void;
  toggleSave: (postId: number) => void;
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

  toggleFavorite: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              isFavorited: !p.isFavorited,
              favoriteCount: p.isFavorited
                ? (p.favoriteCount || 1) - 1
                : (p.favoriteCount || 0) + 1,
            }
          : p,
      ),
    })),

  toggleSave: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              isSaved: !Boolean(p.isSaved),
            }
          : p,
      ),
    })),
}));
