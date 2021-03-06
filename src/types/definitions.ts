export interface ITime {
  current: ReturnType<typeof setInterval> | undefined;
}

export interface ITimer {
  count: number;
}

export interface IPoints {
  totalPoints: number;
}
export interface IMole {
    isUp: number;
    isBomb: boolean;
    onClick?: any;
  }