import {Hall} from "./hall";
import {Movie} from "./movie";

export interface Seanse {
  id: string;
  movieId: string;
  hallId: string;
  movie: Movie;
  hall: Hall;
  startDate: Date;
  startTime: Date;
}
