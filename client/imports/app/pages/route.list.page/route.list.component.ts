import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import template from "./route.list.view.html";
import style from "./route.list.style.scss";

import { Routes } from '../../../../../both/collections/routes.collection';
import { Route } from '../../../../../both/models/route.model';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';

import { LocationService } from "./../../services/app.routing.service";
import {RouteListStateService} from "./route.list.component.state.service";
import { MetaService } from 'ng2-meta';

@Component({
  selector: 'dm-route-list-page',
  template,
  styles: [ style ]
})
@InjectUser("user")
export class RouteListPageComponent {

	private mapOneRouteMode = false;
	private centerLat: number;
    private centerLng: number;
    private zoom: number;
    private path;
	alreadyScrolledToLastPosition = false;


	routingNavigationSub: Subscription;
	routesSub: Subscription;
	mapsDetailsSub: Subscription;
	imagesSubs: Subscription;
  	routes: Observable<Route[]>;
  	mapDetailsList: Observable<Route[]>;
  	mapDetails: Route;

  	constructor(private _router:LocationService, private _state: RouteListStateService, private router: Router, private metaService: MetaService) {
  	}
	
   ngOnInit() {

	   this.metaService.setTag('og:image', 'http://dviraciumarsrutai.lt/img/bike.jpg');
   	  this.initMap();
   	  this.imagesSubs = MeteorObservable.subscribe('images').subscribe();
   	  this.routesSub = MeteorObservable.subscribe('routes').subscribe(() => {
        this.routes = Routes.find({},{ sort: {'sorting_date': -1}}).zone();
        this.mapDetailsList = Routes.find({}, {fields: {title: 1, duration: 1, distance: 1, url: 1, main_icon:1, center_lat: 1, center_lng: 1}}).zone();
		this.scrollToLastPosition();
   	  });
   }
   
   scrollToLastPosition() {
	   if (!this.alreadyScrolledToLastPosition) {
		   let top = this._state.getScrollHeight();
		   this.routingNavigationSub = this.router.events
			   .filter(event => event instanceof NavigationEnd)
			   .subscribe((event: NavigationEnd) => {
				   window.scroll(top, 0);
			   });
		   this.alreadyScrolledToLastPosition = true;
	   }
   }


   ngOnDestroy(){
  	this.routesSub.unsubscribe();
  	this.imagesSubs.unsubscribe();
	   if(this.routingNavigationSub) {
		   this.routingNavigationSub.unsubscribe();
	   }
	let doc = document.documentElement;
	let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	this._state.setScrollHeight(top);
   }

   openRoute(url) {
   	this._router.goToRoutePage(url);
   }

   showRouteInMap(id) {
   	this.mapDetails = Routes.findOne(
   		{_id: id},
			{fields: {title: 1, coordinates: 1, zoom: 1, center_lat: 1, center_lng: 1, distance: 1, atractions: 1}});
   	this.mapOneRouteMode = true;
   		try {
	    	this.path = JSON.parse(this.mapDetails.coordinates);
	    	this.zoom = JSON.parse(this.mapDetails.zoom);
	    	this.centerLat = JSON.parse(this.mapDetails.center_lat);
	    	this.centerLng = JSON.parse(this.mapDetails.center_lng);
	    	this.mapOneRouteMode = true;
		} catch(err) {
		    this.initMap();
		}
   }

   initMap() {
   	this.mapOneRouteMode = false;
   	this.centerLat = 55.346665757714725;
    this.centerLng = 23.82913456359097;
    this.zoom = 7;
    this.path = [];
   }

}