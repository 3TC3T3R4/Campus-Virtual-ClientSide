import { StateRegistration } from "src/base/utils/enums";

export interface RegistrationModel {
  registrationID: number;
  uidUser: string;
  pathID: string;
  createdAt: Date;
  finalRating: number;
  stateInscription: StateRegistration;
}
