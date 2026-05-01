import { create } from "zustand";

type Post = any;

type PostStore = {
  communityPosts: Post[];
  profilePosts: Post[];

  currentUserId: number | null;
  setCurrentUserId: (id: number) => void;

  setCommunityPosts: (posts: Post[] | ((prev: Post[]) => Post[])) => void;
  setProfilePosts: (posts: Post[] | ((prev: Post[]) => Post[])) => void;

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
  communityPosts: [],
  profilePosts: [],

  currentUserId: null,
  setCurrentUserId: (id) => set({ currentUserId: id }),

  setCommunityPosts: (posts) =>
    set((state) => ({
      communityPosts:
        typeof posts === "function" ? posts(state.communityPosts) : posts,
    })),

  setProfilePosts: (posts) =>
    set((state) => ({
      profilePosts:
        typeof posts === "function" ? posts(state.profilePosts) : posts,
    })),

  // ================== COMMON UPDATE ==================
  updateBoth: (state: any, updater: (p: Post) => Post) => ({
    communityPosts: state.communityPosts.map(updater),
    profilePosts: state.profilePosts.map(updater),
  }),

  // ================== COMMENT ==================
  updateCommentCount: (postId) =>
    set((state: any) => ({
      communityPosts: state.communityPosts.map((p: Post) =>
        p.id === postId ? { ...p, commentCount: (p.commentCount || 0) + 1 } : p,
      ),
      profilePosts: state.profilePosts.map((p: Post) =>
        p.id === postId ? { ...p, commentCount: (p.commentCount || 0) + 1 } : p,
      ),
    })),

  // ================== FAVORITE ==================
  toggleFavorite: (postId) =>
    set((state: any) => {
      const update = (p: Post) => {
        if (p.id !== postId) return p;

        const isFavorited = !p.isFavorited;

        return {
          ...p,
          isFavorited,
          favoriteCount: isFavorited
            ? (p.favoriteCount || 0) + 1
            : Math.max((p.favoriteCount || 0) - 1, 0),
        };
      };

      return {
        communityPosts: state.communityPosts.map(update),
        profilePosts: state.profilePosts.map(update),
      };
    }),

  // ================== REALTIME ==================
  updateFavoriteRealtime: (postId, userId, action, newCount) =>
    set((state: any) => {
      const update = (p: Post) => {
        if (p.id !== postId) return p;

        return {
          ...p,
          favoriteCount: newCount,
          isFavorited: userId === state.currentUserId ? action : p.isFavorited,
        };
      };

      return {
        communityPosts: state.communityPosts.map(update),
        profilePosts: state.profilePosts.map(update),
      };
    }),

  // ================== SAVE ==================
  toggleSave: (postId) =>
    set((state: any) => {
      const update = (p: Post) =>
        p.id === postId ? { ...p, isSaved: !Boolean(p.isSaved) } : p;

      return {
        communityPosts: state.communityPosts.map(update),
        profilePosts: state.profilePosts.map(update),
      };
    }),
}));
