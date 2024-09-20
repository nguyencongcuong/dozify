import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

interface State {
  trayIconSetNo: string;
}

interface Actions {
  setTrayIconSetNo: (setNo: string) => void;
}

export const useAppearance = createWithEqualityFn(
  persist(
    immer<State & Actions>((set) => ({
      trayIconSetNo: '1',
      setTrayIconSetNo: (setNo: string) => {
        set((state) => {
          state.trayIconSetNo = setNo;
          window.electronAPI.changeTrayIcon(setNo);
        });
      },
    })),
    {
      name: 'appearance::customize-menu-icon', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
