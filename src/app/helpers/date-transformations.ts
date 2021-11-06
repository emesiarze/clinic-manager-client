export class DateTransformations {
  public static getSecondsFromDate(date: Date): number {
    date = new Date(date);
    console.log(date, Date.now());
    const result = Date.now() - date.getTime();
    const secondsFromDate = result / 1000;
    console.log(secondsFromDate);
    return secondsFromDate;
  }
}
