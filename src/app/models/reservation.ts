export interface Reservation {
  id: string;
  userId: string;
  seanseId: string;
  seatNumber: number;
  startTime: Date;
  isPermanent: boolean;
}
