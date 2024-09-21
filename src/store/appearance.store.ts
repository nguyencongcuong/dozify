import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

interface State {
  trayIconSetNo: string;
  isRemainingTimeShown: boolean;
}

interface Actions {
  setTrayIconSetNo: (setNo: string) => void;
  toggleRemainingTime: (bool: boolean) => void;
}

export const useAppearance = createWithEqualityFn(
  persist(
    immer<State & Actions>((set) => ({
      trayIconSetNo: '1',
      isRemainingTimeShown: false,
      setTrayIconSetNo: (setNo: string) => {
        set((state) => {
          state.trayIconSetNo = setNo;
        });
      },
      toggleRemainingTime: (isShown: boolean) => {
        set((state) => {
          state.isRemainingTimeShown = isShown;
        });
      },
    })),
    {
      name: 'appearance::storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
