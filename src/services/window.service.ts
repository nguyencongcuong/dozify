import { BrowserWindow } from 'electron';
import path from 'path';

export class WindowService {
  public static mainWindow: BrowserWindow;

  public static async createWindow() {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      width: 576,
      height: 400,
      icon: path.join(__dirname, 'icon.icns'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
      resizable: false,
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
    // app.dock.hide();

    this.mainWindow.webContents.closeDevTools();
  }

  public static open() {
    if (this.mainWindow) {
      if (this.mainWindow.isDestroyed()) {
        // Close window will destroy mainWindow
        this.createWindow();
      } else {
        this.mainWindow.show();
      }
    } else {
      this.createWindow();
    }
  }
}
