export class DateTransformations {
  public static getSecondsFromDate(date: Date): number {
    date = new Date(date);
    const result = Date.now() - date.getTime();
    // Return seconds elapsed from date to now
    return result / 1000;
  }
}
