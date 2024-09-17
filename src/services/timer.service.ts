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
}
