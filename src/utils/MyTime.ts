export class MyTime {
  public static setDays(days: number) {
    const now = new Date();
    now.setDate(now.getDate() + days);
    return now;
  }

  public static setAddMinutes(yourDateTime: Date, minutes: number) {
    const time = yourDateTime.getTime();
    const expireTime = time + 1000 * 60 * minutes; // 1000ms * 60s
    yourDateTime.setTime(expireTime);
    return yourDateTime;
  }

  public static setMinusMinutes(yourDateTime: Date, minutes: number) {
    const time = yourDateTime.getTime();
    const expireTime = time - 1000 * 60 * minutes; // 1000ms * 60s
    yourDateTime.setTime(expireTime);
    return yourDateTime;
  }
}
