import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: Date): string {
    const date = new Date(value);
    return date.toLocaleDateString('pl-PL');
  }

}

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Date): string {
    const date = new Date(value);
    return date.toLocaleTimeString('pl-PL');
  }

}
