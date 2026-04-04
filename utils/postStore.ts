import { create } from "zustand";

type Post = any;

type PostStore = {
  posts: Post[];
  currentUserId: number | null;

  setPosts: (posts: Post[] | ((prev: Post[]) => Post[])) => void;

  updateCommentCount: (postId: number) => void;
  toggleFavorite: (postId: number) => void;
  toggleSave: (postId: number) => void;
  updateFavoriteRealtime: (
    postId: number,
    userId: number,
    action: boolean,
    newCount: number,
  ) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  currentUserId: null,

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
      posts: state.posts.map((p) => {
        if (p.id !== postId) return p;

        const isFavorited = !p.isFavorited;

        return {
          ...p,
          isFavorited,
          favoriteCount: isFavorited
            ? (p.favoriteCount || 0) + 1
            : Math.max((p.favoriteCount || 0) - 1, 0),
        };
      }),
    })),

  updateFavoriteRealtime: (postId, userId, action, newCount) =>
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== postId) return p;

        return {
          ...p,
          favoriteCount: newCount,
          isFavorited: userId === state.currentUserId ? action : p.isFavorited,
        };
      }),
    })),

  toggleSave: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, isSaved: !Boolean(p.isSaved) } : p,
      ),
    })),
}));
