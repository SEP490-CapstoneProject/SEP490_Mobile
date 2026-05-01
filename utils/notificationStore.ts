import { create } from "zustand";

type Notification = {
  id: number;
  userId: number;
  title: string;
  content: string;
  type: string;
  objectId?: number;
  actor?: {
    id: number;
    name: string;
    avatar: string;
    Role: string;
  };
  createdAt: string;
  isRead: boolean;
};

type State = {
  systemNotifications: Notification[];
  communityNotifications: Notification[];

  addSystemNotification: (n: Notification) => void;
  addCommunityNotification: (n: Notification) => void;

  setSystemNotifications: (list: Notification[]) => void;
  setCommunityNotifications: (list: Notification[]) => void;

  markAllRead: () => void;
  markOneRead: (id: number) => void;
};

export const useNotificationStore = create<State>((set) => ({
  systemNotifications: [],
  communityNotifications: [],

  addSystemNotification: (n) =>
    set((state) => {
      if (state.systemNotifications.some((i) => i.id === n.id)) {
        return state;
      }
      return {
        systemNotifications: [n, ...state.systemNotifications],
      };
    }),

  addCommunityNotification: (n) =>
    set((state) => {
      const exists = state.communityNotifications.some(
        (item) => item.id === n.id,
      );

      if (exists) return state;

      return {
        communityNotifications: [n, ...state.communityNotifications],
      };
    }),

  setSystemNotifications: (list) =>
    set(() => ({
      systemNotifications: list,
    })),

  setCommunityNotifications: (list) =>
    set(() => ({
      communityNotifications: list,
    })),

  markAllRead: () =>
    set((state) => ({
      systemNotifications: state.systemNotifications.map((n) => ({
        ...n,
        isRead: true,
      })),
      communityNotifications: state.communityNotifications.map((n) => ({
        ...n,
        isRead: true,
      })),
    })),

  markOneRead: (id) =>
    set((state) => ({
      systemNotifications: state.systemNotifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      ),
      communityNotifications: state.communityNotifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      ),
    })),
}));
