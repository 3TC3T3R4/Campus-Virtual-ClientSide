import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minsToHours',
})
export class MinsToHoursPipe implements PipeTransform {
  transform(value: string | number): string {
    const hours = Math.floor(Number(value) / 60);
    const minutes = Number(value) % 60;
    const hoursString = hours ? `${hours} h ` : '';
    const minutesString = minutes ? `${minutes} mins` : '';
    return `${hoursString}${minutesString}`;
  }
}
