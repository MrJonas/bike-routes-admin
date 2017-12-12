import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'IconUrlPipe'
})
export class IconUrlPipe implements PipeTransform {
  transform(icon) {

    if(!icon) {
      return 'maki/icons/' + 'marker' + '-15.svg'
    }

    return 'maki/icons/' + icon + '-15.svg';
  }
}