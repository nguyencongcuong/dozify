import {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  powerMonitor,
} from 'electron';
import { TrayService } from './services/tray.service';
import { WindowService } from './services/window.service';
import { EVENT } from './contants/event';
import { PowerService } from './services/power.service';

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

  ipcMain.on(
    EVENT['appearance:remaining-time-shown'],
    (_event, isShown: boolean) => {
      PowerService.isRemainingTimeShown = isShown;
      TrayService.createTray(mainWindow);
    },
  );

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

  app.on('ready', async () => {
    setInterval(() => {
      const idleTime = powerMonitor.getSystemIdleTime();
      console.log(`System has been idle for ${idleTime} seconds`);

      if (idleTime > 300) {
        // Assuming display turns off after 5 minutes (300 seconds)
        console.log('The display might turn off soon');
      }
    }, 1000); // Check every 10 seconds
  });
})();
