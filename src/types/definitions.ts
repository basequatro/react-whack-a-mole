export interface ITime {
    current: ReturnType<typeof setInterval> | undefined;
  }