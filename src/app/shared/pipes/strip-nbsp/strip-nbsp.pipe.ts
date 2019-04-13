import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripNbsp'
})
export class StripNbspPipe implements PipeTransform {


  transform(value: string, args: Array<string>): string {
    return value.replace(/&nbsp;/g, '');
  }

}
