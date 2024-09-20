export {};

declare global {
  interface Window {
    electronAPI: {
      changeTrayIcon: (setNo: string) => void;
    };
  }
}
