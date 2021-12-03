import {Symptom} from "./symptom";

export interface Disease {
  id: string
  name: string
  symptoms: Symptom[];
}
