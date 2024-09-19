import {
  app,
  BrowserWindow,
  Menu,
  nativeImage,
  nativeTheme,
  Tray,
} from 'electron';
import * as path from 'path';
import { PowerService } from './power.service';
import { TimerService } from './timer.service';

export class TrayService {
  public static tray: Tray | null = null;

  // https://github.com/electron/electron/blob/main/docs/api/native-image.md#template-image
  static getTrayIcon() {
    const imagePath = PowerService.isAwakeAllowed
      ? path.join(__dirname, 'tray-icon-opened.png')
      : path.join(__dirname, 'tray-icon-closed.png');
    const image = nativeImage.createFromPath(imagePath);
    const resizedImage = image.resize({ width: 24, height: 24 });
    resizedImage.setTemplateImage(true);
    return resizedImage;
  }

  static createTray(mainWindow: BrowserWindow) {
    this.tray = new Tray(this.getTrayIcon());

    // Function to rebuild and set the tray context menu
    const updateTrayMenu = () => {
      const contextMenu = Menu.buildFromTemplate([
        {
          label: PowerService.isAwakeAllowed ? 'Allow sleep' : 'Allow awake',
          accelerator: 'Cmd+W',
          click: () => {
            if (PowerService.isAwakeAllowed) {
              PowerService.allowSleep();
            } else {
              PowerService.allowAwake({ isInfinity: true });
            }
            // Update the tray menu after toggling power state
            updateTrayMenu();
          },
        },
        {
          label: `Remaining awake time: ${PowerService.remainingTime}s`,
          enabled: false,
          visible: Boolean(PowerService.awakeTimer),
        },
        {
          type: 'separator',
        },
        {
          label: 'Minutes',
          submenu: [
            {
              label: '5 minutes',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'minutes',
                    value: 5,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '10 minutes',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'minutes',
                    value: 10,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              type: 'separator',
            },
            {
              label: '15 minutes',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'minutes',
                    value: 15,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '20 minutes',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'minutes',
                    value: 20,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              type: 'separator',
            },
            {
              label: '25 minutes',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'minutes',
                    value: 25,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '30 minutes',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'minutes',
                    value: 30,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              type: 'separator',
            },
            {
              label: '35 minutes',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'minutes',
                    value: 35,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '40 minutes',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'minutes',
                    value: 40,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              type: 'separator',
            },
            {
              label: '45 minutes',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'minutes',
                    value: 45,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '50 minutes',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'minutes',
                    value: 50,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
          ],
        },
        {
          label: 'Hours',
          submenu: [
            {
              label: '1 hour',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 1,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '2 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 2,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '3 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 3,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '4 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 4,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '5 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 5,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '6 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 6,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              type: 'separator',
            },
            {
              label: '7 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 7,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '8 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 8,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '9 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 9,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '10 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 10,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '11 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 11,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '12 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 12,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              type: 'separator',
            },
            {
              label: '13 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 13,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '14 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 14,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '15 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 15,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '16 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 16,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '17 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 17,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '18 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 18,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              type: 'separator',
            },
            {
              label: '19 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 19,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '20 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 20,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '21 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 21,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '22 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 22,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '23 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 23,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
            {
              label: '24 hours',
              click: () => {
                PowerService.allowAwake({
                  isInfinity: false,
                  timer: TimerService.getMilliseconds({
                    type: 'hours',
                    value: 24,
                  }),
                  onTimerStart: updateTrayMenu,
                  onTimerEnd: updateTrayMenu,
                });
              },
            },
          ],
        },
        {
          label: 'Quit',
          accelerator: 'Cmd+Q',
          click: () => {
            app.quit();
          },
        },
      ]);

      this.tray.setContextMenu(contextMenu);
    };

    this.tray.setToolTip('Dozify - Keep your Mac awake, effortlessly');

    // Initial setup of the tray menu
    updateTrayMenu();

    // Handle tray icon click event
    this.tray.on('click', () => {
      if (mainWindow) {
        mainWindow.show();
      }
    });

    // Listen for theme updates (e.g., if user changes system appearance)
    nativeTheme.on('updated', () => {
      this.tray.setImage(this.getTrayIcon()); // Update tray icon based on the new theme
    });
  }
}
