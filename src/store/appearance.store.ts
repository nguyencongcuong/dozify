import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

interface State {
  trayIconSetNo: string;
  isRemainingTimeShown: boolean;
  isDarkMode: boolean;
}

interface Actions {
  setTrayIconSetNo: (setNo: string) => void;
  toggleRemainingTime: (bool: boolean) => void;
  toggleDarkMode: (bool: boolean) => void;
}

export const useAppearance = createWithEqualityFn(
  persist(
    immer<State & Actions>((set) => ({
      trayIconSetNo: '1',
      isDarkMode: false,
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
      toggleDarkMode: (isDarkMode: boolean) => {
        set((state) => {
          console.debug('userAppearance', 'toggleDarkMode', isDarkMode);
          state.isDarkMode = isDarkMode;
        });
      },
    })),
    {
      name: 'appearance::storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
