export {};

declare global {
  interface Window {
    electronAPI: {
      changeTrayIcon: (setNo: string) => void;
      toggleRemainingTime: (isShown: boolean) => void;
      onThemeChange: (callback: (isDark: boolean) => void) => void;
    };
  }
}
