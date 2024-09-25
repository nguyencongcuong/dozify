import { app, Menu, nativeImage, shell, Tray } from 'electron';
import * as path from 'path';
import { PowerService } from './power.service';
import { TimerService } from './timer.service';
import _ from 'lodash';
import packageInfo from '../../package.json';

export class TrayService {
  public static tray: Tray | null = null;
  public static trayIconSetNo = 1;
  public static trayDir = path.join(__dirname, 'assets', 'images', 'trays');

  // https://github.com/electron/electron/blob/main/docs/api/native-image.md#template-image
  static getTrayIcon() {
    const imagePath = PowerService.isAwakeAllowed
      ? `${this.trayDir}/tray-icon-${this.trayIconSetNo}-awake.png`
      : `${this.trayDir}/tray-icon-${this.trayIconSetNo}-sleep.png`;

    console.log(this.getTrayIcon.name, 'imagePath', imagePath);

    const image = nativeImage.createFromPath(imagePath);
    const resizedImage = image.resize({ width: 16, height: 16 });
    resizedImage.setTemplateImage(true);
    return resizedImage;
  }

  static getMenuIcon(setNo: number) {
    const imagePath = PowerService.isAwakeAllowed
      ? `${this.trayDir}/tray-icon-${setNo}-awake.png`
      : `${this.trayDir}/tray-icon-${setNo}-sleep.png`;
    const image = nativeImage.createFromPath(imagePath);
    return image.resize({ width: 16, height: 16 });
  }

  static setMenuIcon(setNo: number) {
    this.trayIconSetNo = setNo;
    this.createTray();
  }

  static createTray() {
    // Remove the existing tray & all listeners
    if (this.tray) {
      this.tray.destroy();
      this.tray.removeAllListeners();
    }

    this.tray = new Tray(this.getTrayIcon());

    // Function to rebuild and set the tray context menu
    const updateTrayMenu = () => {
      const contextMenu = Menu.buildFromTemplate([
        {
          label: PowerService.isAwakeAllowed ? 'Allow sleep' : 'Keep awake',
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
          label: `Awake mode: ${PowerService.isAwakeAllowed ? 'ON' : 'OFF'}`,
          toolTip: PowerService.isAwakeAllowed
            ? 'Your Mac is staying awake'
            : 'Your Mac will sleep on normal schedule',
          enabled: false,
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
          type: 'separator',
        },
        {
          type: 'separator',
        },
        {
          label: 'Customize menu icon',
          submenu: [
            {
              type: 'checkbox',
              label: '',
              checked: this.trayIconSetNo == 1,
              icon: this.getMenuIcon(1),
              click: () => {
                this.setMenuIcon(1);
              },
            },
            {
              type: 'checkbox',
              label: '',
              checked: this.trayIconSetNo == 2,
              icon: this.getMenuIcon(2),
              click: () => {
                this.setMenuIcon(2);
              },
            },
            {
              type: 'checkbox',
              label: '',
              checked: this.trayIconSetNo == 3,
              icon: this.getMenuIcon(3),
              click: () => {
                this.setMenuIcon(3);
              },
            },
            {
              type: 'checkbox',
              label: '',
              checked: this.trayIconSetNo == 4,
              icon: this.getMenuIcon(4),
              click: () => {
                this.setMenuIcon(4);
              },
            },
            {
              type: 'checkbox',
              label: '',
              checked: this.trayIconSetNo == 5,
              icon: this.getMenuIcon(5),
              click: () => {
                this.setMenuIcon(5);
              },
            },
          ],
        },

        {
          label: 'Show timer in awake mode',
          checked: PowerService.isRemainingTimeShown,
          type: 'checkbox',
          click: () => {
            PowerService.updateIsRemainingTimeShown(
              !PowerService.isRemainingTimeShown,
            );
          },
        },
        {
          type: 'separator',
        },
        {
          type: 'separator',
        },
        {
          role: 'about',
          label: 'About',
          submenu: [
            {
              label: `Dozify (v${packageInfo.version}) © ${new Date().getFullYear()}`,
            },
            {
              label: `Keep your macOS awake, effortlessly`,
            },
            {
              label: `Developed by ${packageInfo.author.name}`,
            },
            {
              type: 'separator',
            },
            {
              label: `Open homepage...`,
              toolTip: 'Leave feedbacks / Report bugs',
              click: async () => await shell.openExternal(packageInfo.homepage),
            },
          ],
        },
        {
          type: 'separator',
        },
        {
          role: 'quit',
          label: 'Quit',
          accelerator: 'Cmd+Q',
          click: () => {
            app.quit();
          },
        },
      ]);

      this.tray.setContextMenu(contextMenu);

      // Populate the remaining time showing next to the tray icon
      if (PowerService.isAwakeAllowed) {
        if (PowerService.isRemainingTimeShown) {
          if (_.isNumber(PowerService.remainingTime)) {
            this.tray.setTitle(
              TimerService.secondsToTimeFormat(PowerService.remainingTime),
              { fontType: 'monospacedDigit' },
            );
          } else {
            this.tray.setTitle('∞');
          }
        }
      } else {
        this.tray.setTitle('');
      }
    };

    this.tray.setToolTip('Dozify - Keep your Mac awake, effortlessly');

    // Initial setup of the tray menu
    updateTrayMenu();
  }
}
