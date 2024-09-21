// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { EVENT } from './contants/event';

contextBridge.exposeInMainWorld('electronAPI', {
  changeTrayIcon: (index: number) =>
    ipcRenderer.send(EVENT['appearance:tray-icon'], index),
  toggleRemainingTime: (isShown: boolean) => {
    ipcRenderer.send(EVENT['appearance:remaining-time-shown'], isShown);
  },
  onThemeChange: (callback: (isDark: boolean) => void) => {
    ipcRenderer.on(EVENT['appearance:system-theme'], (_event, theme) => {
      callback(theme);
    });
  },
});
