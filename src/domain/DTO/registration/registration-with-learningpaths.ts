import { StatePath, StateRegistration } from "src/base/utils/enums";

export interface RegistrationWithPaths {
  registrationID: number;
  uidUser: string;
  pathID: string;
  createdAt: Date;
  finalRating: number;
  stateInscription: StateRegistration;
  coachID: string;
  title: string;
  description: string;
  duration: number;
  statePath: StatePath;
}
