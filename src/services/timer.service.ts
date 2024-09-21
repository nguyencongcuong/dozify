interface IGetMilliseconds {
  type: 'minutes' | 'hours' | 'days';
  value: number;
}

export class TimerService {
  static getMilliseconds(options: IGetMilliseconds): number {
    switch (options.type) {
      case 'minutes':
        return options.value * 60 * 1000;
      case 'hours':
        return options.value * 60 * 60 * 1000;
      case 'days':
        return options.value * 60 * 60 * 24 * 1000;
      default:
        return options.value;
    }
  }

  static secondsToTimeFormat(seconds: number): string {
    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Add leading zeros to minutes and seconds if needed
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = secs.toString().padStart(2, '0');

    // Return the time in "hh:mm:ss" format
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
