import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import { TrayService } from './services/tray.service';
import { WindowService } from './services/window.service';
import { EVENT } from './contants/event';

let mainWindow: BrowserWindow;

(async function () {
  // Define ipcMain listeners
  // Two-way (request-response) communication
  ipcMain.handle(EVENT['dark-mode:toggle'], () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
  });

  // One-way communication
  ipcMain.handle(EVENT['dark-mode:system'], () => {
    nativeTheme.themeSource = 'system';
  });

  ipcMain.on(EVENT['appearance:tray-icon'], (_event, setNo: number) => {
    console.log('ipcMain.changeTrayIcon', setNo);
    TrayService.trayIconSetNo = setNo;
    TrayService.createTray(mainWindow);
  });

  // Listen for theme updates (e.g., if user changes system appearance)
  nativeTheme.on('updated', () => {
    TrayService.tray.setImage(TrayService.getTrayIcon()); // Update tray icon based on the new theme
  });

  // Create window and tray after app initialization
  await app.whenReady();
  await WindowService.createWindow();
  TrayService.createTray(mainWindow);

  // Tray listener
  TrayService.tray.on('click', () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });

  // Quit the app when all windows are closed (except on macOS)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // Re-create window when the app is activated
  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await WindowService.createWindow();
    }
  });
})();
