// chatState.ts
import { create } from "zustand";

type ChatState = {
  currentRoomId: number | null;
  setCurrentRoomId: (id: number | null) => void;
};

export const useChatState = create<ChatState>((set) => ({
  currentRoomId: null,
  setCurrentRoomId: (id) => set({ currentRoomId: id }),
}));
