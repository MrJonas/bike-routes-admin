import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'AtractionsPipe'})
export class AtractionsPipe implements PipeTransform {
  transform(value, show: boolaen) {
  	return show ? value.atractions : [];
  }
}