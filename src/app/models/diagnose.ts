import {Symptom} from "./symptom";
import {Disease} from "./disease";
import {User} from "./user";

export interface Diagnose {
  id: string;
  patient: User;
  doctor: User;
  disease: Disease;
  symptomsExperienced: Symptom[];
  diagnoseDate: Date;
}
