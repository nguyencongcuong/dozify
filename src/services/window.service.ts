import { app, BrowserWindow } from 'electron';
import path from 'path';

export class WindowService {
  public static mainWindow: BrowserWindow;

  public static async createWindow() {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      width: 600,
      height: 600,
      icon: path.join(__dirname, 'icon.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      await this.mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      await this.mainWindow.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      );
    }
    // Hide icon in dock
    app.dock.hide();
  }
}
