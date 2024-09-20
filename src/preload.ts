// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { EVENT } from './contants/event';

contextBridge.exposeInMainWorld('electronAPI', {
  toggle: () => ipcRenderer.invoke(EVENT['dark-mode:toggle']),
  system: () => ipcRenderer.invoke(EVENT['dark-mode:system']),
  changeTrayIcon: (index: number) =>
    ipcRenderer.send(EVENT['appearance:tray-icon'], index),
});
