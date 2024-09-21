import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import { TrayService } from './services/tray.service';
import { WindowService } from './services/window.service';
import { EVENT } from './contants/event';
import { PowerService } from './services/power.service';
import { THEME } from './contants/theme';

let mainWindow: BrowserWindow;

(async function () {
  // One-way communication
  ipcMain.on(EVENT['appearance:tray-icon'], (_event, setNo: number) => {
    console.log('ipcMain.changeTrayIcon', setNo);
    TrayService.trayIconSetNo = setNo;
    TrayService.createTray(mainWindow);
  });

  ipcMain.on(
    EVENT['appearance:remaining-time-shown'],
    (_event, isShown: boolean) => {
      PowerService.isRemainingTimeShown = isShown;
      TrayService.createTray(mainWindow);
    },
  );

  // Create window and tray after app initialization
  await app.whenReady();
  await WindowService.createWindow();
  TrayService.createTray(mainWindow);

  // Listen for theme updates (e.g., if user changes system appearance)
  nativeTheme.on('updated', () => {
    WindowService.mainWindow.webContents.send(
      EVENT['appearance:system-theme'],
      nativeTheme.shouldUseDarkColors,
    );
    WindowService.mainWindow.setBackgroundColor(
      nativeTheme.shouldUseDarkColors
        ? THEME.DARK.token.colorBgBase
        : THEME.LIGHT.token.colorBgBase,
    );
    TrayService.tray.setImage(TrayService.getTrayIcon()); // Update tray icon based on the new theme
  });

  // Send the system's theme preference when the app starts
  mainWindow.webContents.once('did-finish-load', () => {
    console.log('main windows did finish load');
    WindowService.mainWindow.webContents.send(
      EVENT['appearance:system-theme'],
      nativeTheme.shouldUseDarkColors,
    );
    mainWindow.setBackgroundColor(
      nativeTheme.shouldUseDarkColors
        ? THEME.DARK.token.colorBgBase
        : THEME.LIGHT.token.colorBgBase,
    );
  });

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
