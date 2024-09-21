import { powerSaveBlocker } from 'electron';
import _ from 'lodash';
import { TrayService } from './tray.service';
import { NotificationService } from './notification.service';

interface IAllowAwakeOptions {
  isInfinity: boolean; // true when keeping Mac awake infinitely
  timer?: number; // how long Mac will stay awake in milliseconds
  onTimerStart?: () => void;
  onTimerEnd?: () => void;
}

export class PowerService {
  public static powerSaverId: number;
  public static awakeTimer: NodeJS.Timeout;
  public static intervalTimer: NodeJS.Timeout;
  public static remainingTime: number | '∞' | '' = '';
  public static isRemainingTimeShown = false;

  // Getter to dynamically check if the system is currently being kept awake
  public static get isAwakeAllowed(): boolean {
    if (!_.isNumber(this.powerSaverId)) return false;
    return powerSaveBlocker.isStarted(this.powerSaverId);
  }

  // Prevent the system from entering sleep mode
  static allowAwake(options: IAllowAwakeOptions) {
    // Clear any previous timers if they exist
    if (this.intervalTimer) clearInterval(this.intervalTimer);
    if (this.awakeTimer) clearInterval(this.awakeTimer);

    // Prevent sleep immediately
    this.powerSaverId = powerSaveBlocker.start('prevent-display-sleep');

    // Create timers
    this.remainingTime = options.isInfinity ? '∞' : options.timer / 1000;

    if (options.onTimerStart) options.onTimerStart();

    if (!options.isInfinity) {
      this.awakeTimer = setTimeout(() => {
        this.allowSleep();
        clearInterval(this.intervalTimer);
        if (options.onTimerEnd) options?.onTimerEnd();
      }, options.timer);

      this.intervalTimer = setInterval(() => {
        if (_.isNumber(this.remainingTime)) this.remainingTime--;
        // Log
        console.log(
          'Mac is now awake.',
          `Power Save Blocker ID: ${this.powerSaverId}.`,
          `Remaining Time: ${this.remainingTime}`,
        );
        if (this.remainingTime <= 0) {
          clearInterval(this.intervalTimer);
          NotificationService.sendNotification();
        }
        if (options.onTimerEnd) options.onTimerEnd();
      }, 1000);
    }

    // Update tray icon
    TrayService.tray.setImage(TrayService.getTrayIcon());

    // Log
    console.log(
      'Mac is now awake.',
      `Power Save Blocker ID: ${this.powerSaverId}.`,
    );
  }

  static allowSleep() {
    // Clear any previous timers if they exist
    if (this.intervalTimer) clearInterval(this.intervalTimer);
    if (this.awakeTimer) clearInterval(this.awakeTimer);

    // Allow sleep mode
    if (this.isAwakeAllowed) {
      powerSaveBlocker.stop(this.powerSaverId);
      NotificationService.sendNotification();
      console.log(
        'Mac is now allowed to sleep.',
        `Power Save Blocker ID: ${this.powerSaverId}.`,
      );
    }

    // Update tray icon
    TrayService.tray.setImage(TrayService.getTrayIcon());
  }
}
