import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'FilterSearcPipe'})
export class FilterSearcPipe implements PipeTransform {
  transform(routes, searchValue: string) {

  	if(!routes) {
  		return [{}];
  	}

  	let filteredRoutes = routes.filter((route)=>{return route.score;});
  	filteredRoutes = filteredRoutes.map((route)=>{

  		// console.log(route);

  		// route.body = route.body ? String(route.body).replace(/<[^>]+>/gm, '') : '';
  		
  		// var re = new RegExp(searchValue, 'i');

  		// route.display_text = route.body.replace(re, "<b>" + searchValue.toLowerCase() +"</b>");

  		//TODO rodyti pasirinktą teksto franzes.

  		route.display_text = route.short_description;

  		return route;
  	});

  	if( searchValue && (!filteredRoutes || filteredRoutes.length == 0)) {
  		return [{no_routes: "Nepavyko rasti maršrutų. Papildykite paiešką"}];
  	}

  	return filteredRoutes;
  }
}