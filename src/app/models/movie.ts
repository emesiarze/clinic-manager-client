import {Identifiable} from "./Identifiable";

export interface Movie extends Identifiable {
  id: string
  director: string
  title: string
  duration: number;
}
