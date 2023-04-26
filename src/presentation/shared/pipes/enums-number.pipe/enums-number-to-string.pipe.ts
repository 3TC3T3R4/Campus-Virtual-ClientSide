import { Pipe, PipeTransform } from '@angular/core';
import {
  Roles,
  StateRegistration,
  StateContent,
  TypeContent,
  StateUser
} from '../../../../base/utils/enums';

@Pipe({
  name: 'enumsNumberToStringPipe',
})
export class EnumsNumberToStringPipe implements PipeTransform {
  transform(
    value:
      | Roles
      | StateUser
      | StateRegistration
      | StateContent
      | TypeContent,
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
  StateContent: string;
  TypeContent: string;
}

const ROLE_VALUES: EnumValues = {
  role: ',Admin,Trainee',
  stateUser: ',Active,Deleted',
  stateRegistration: ',Active,Deleted',
  StateContent: ',Active,Deleted',
  TypeContent: ',Workshop,Lesson,Challenge'
};
