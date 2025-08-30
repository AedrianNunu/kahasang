import { create } from "zustand";

interface ModalStore {
  isLoginOpen: boolean;
  isCreateAccountOpen: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
  setIsCreateAccountOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isLoginOpen: false,
  isCreateAccountOpen: false,
  setIsLoginOpen: (isOpen) => set({ isLoginOpen: isOpen }),
  setIsCreateAccountOpen: (isOpen) => set({ isCreateAccountOpen: isOpen }),
}));

interface AuthStore {
  user: any;
  setUser: (user: any) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  initialize: () => {
    // Add logic to initialize user from session (e.g., fetch from API)
  },
}));