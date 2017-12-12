import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'showListPipe'})
export class showListPipe implements PipeTransform {
  transform(array, show: boolaen) {
  	return show ? array : [];
  }
}