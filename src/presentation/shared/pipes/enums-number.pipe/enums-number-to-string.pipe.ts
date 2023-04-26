import { Pipe, PipeTransform } from '@angular/core';
import {
  Roles,
  StateRegistration,

} from '../../../../base/utils/enums';

@Pipe({
  name: 'enumsNumberToStringPipe',
})
export class EnumsNumberToStringPipe implements PipeTransform {
  transform(
    value:
      | Roles
      | StateRegistration,
    type: keyof EnumValues
  ): string {
    const values = ROLE_VALUES[type].split(',');
    return values[value] || '';
  }
}

export interface EnumValues {
  role: string;
  stateRegistration: string;
}

const ROLE_VALUES: EnumValues = {
  role: 'Default,Admin,Contributor',
  stateRegistration: 'Active,Deleted',
};
