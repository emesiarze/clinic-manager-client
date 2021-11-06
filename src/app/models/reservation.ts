export interface Reservation {
  id: string;
  userId: string;
  seanseId: string;
  seatNumber: number;
  startTime: Date;
  isPermanent: boolean;
}

export class Reservation {
  constructor(
    public id: string,
    public userId: string,
    public seanseId: string,
    public seatNumber: number,
    public startTime = new Date(),
    public isPermanent = false,) {
  }
}
