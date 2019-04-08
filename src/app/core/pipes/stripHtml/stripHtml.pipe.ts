import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'striphtml'
})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string, args: Array<string>): string {
    value = value.replace(/<.*?>/g, '');
    const limit = args.length > 0 ? parseInt(args[0], 10) : 0;
    const trail = args.length > 1 ? args[1] : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
   }
}
