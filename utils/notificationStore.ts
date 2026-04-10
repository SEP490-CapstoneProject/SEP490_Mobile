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
  };
  createdAt: string;
  isRead: boolean;
};

type State = {
  notifications: Notification[];
  setNotifications: (data: Notification[]) => void;
  addNotification: (n: Notification) => void;
  markAllRead: () => void;
  markOneRead: (id: number) => void;
};

export const useNotificationStore = create<State>((set) => ({
  notifications: [],

  setNotifications: (data) => set({ notifications: data }),

  addNotification: (n) =>
    set((state) => ({
      notifications: [n, ...state.notifications],
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({
        ...n,
        isRead: true,
      })),
    })),

  markOneRead: (id: number) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      ),
    })),
}));
