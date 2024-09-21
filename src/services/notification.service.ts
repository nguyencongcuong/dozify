import { Notification } from 'electron';

export class NotificationService {
  public static sendNotification() {
    const notification = new Notification({
      title: 'Dozify',
      body: 'Time’s up! Your Mac will now resume its regular sleep schedule',
      silent: false,
    });

    // Show the notification
    notification.show();
  }
}
