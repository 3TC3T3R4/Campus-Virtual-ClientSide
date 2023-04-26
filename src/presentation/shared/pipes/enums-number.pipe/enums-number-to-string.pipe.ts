import { Pipe, PipeTransform } from '@angular/core';
import {
  Roles,
  StateRegistration,
  StateUser,

} from '../../../../base/utils/enums';

@Pipe({
  name: 'enumsNumberToStringPipe',
})
export class EnumsNumberToStringPipe implements PipeTransform {
  transform(
    value:
      | Roles
      | StateUser
      | StateRegistration,
    type: keyof EnumValues
  ): string {
    const values = ROLE_VALUES[type].split(',');
    return values[value] || '';
  }
}

export interface EnumValues {
  role: string;
  stateUser: string;
  stateRegistration: string;
}

const ROLE_VALUES: EnumValues = {
  role: ',Admin,Trainee',
  stateUser: ',Active,Deleted',
  stateRegistration: ',Active,Deleted',
};
