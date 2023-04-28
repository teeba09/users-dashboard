import create from "zustand";

export const useApp = create((set) => ({
  isAddUserModal: false,
  isLogin: false,
  setIisAddUserModal: (isAddUserModal) => set({ isAddUserModal }),
  setIisLogin: (isLogin) => set({ isLogin }),
}));
