import { create } from "zustand";

//Infinite Music Play
export const useIMPStore = create((set) => ({
  isIMP: false,
  toggleIsIMP: () => set((state) => ({ isIMP: !state.isIMP })),
}));

//Allow Change Music
export const useACMStore = create((set) => ({
  isACM: false,
  toggleIsACM: () => set((state) => ({ isACM: !state.isACM })),
}));

//Allow Delete Music
export const useADMStore = create((set) => ({
  isADM: false,
  toggleIsADM: () => set((state) => ({ isADM: !state.isADM })),
}));

//Music List Reload //그냥 일반적인 상황에서 음악목록 렌더링 필요할 때 이용
export const useMLRStore = create((set) => ({
  isMLR: false,
  toggleIsMLR: () => set((state) => ({ isMLR: !state.isMLR })),
}));
