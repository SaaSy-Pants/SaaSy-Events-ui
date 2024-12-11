import {Pipe, PipeTransform} from '@angular/core';
import {Duration} from 'luxon';

@Pipe({
  standalone: true,
  name: 'durationToTime'
})
export class DurationToTimePipe implements PipeTransform {
  transform(durationISO: string): string {
    const duration = Duration.fromISO(durationISO);
    return duration.toFormat('h:mm')
  }
}
