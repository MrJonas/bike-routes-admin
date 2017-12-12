import { Component, Input } from '@angular/core';

import template from "./distance.counter.view.html";
import style from "./distance.counter.style.scss";

import { Routes } from '../../../../../../../both/collections/routes.collection';
import { Route } from '../../../../../../../both/models/route.model';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dm-distance-counter',
  template,
  styles: [ style ]
})
export class DistanceCounterComponent {

    routesSub: Subscription;
	routes: Observable<Route[]>;

	interval;
	collapse = false;
	isSmall = false;
	distance: number;
	currentTextID = 0;
	text = [
		"Tai žymiai mažiau kilometrų negu norint apvažiuoti žemę du kartus.",
		"Tai daugiau kilometrų, nei senovės egiptiečiai pastatė piramidžių.",
		"Mes jautėmės pavargę jau po pirmų trijų kilometrų.",
		"Tai daugiau negu Zervynos kaimo populiacija."
	]

	ngOnInit() {
		this.routesSub = MeteorObservable.subscribe('routes').subscribe(() => {
	    	this.routes = Routes.find({}, {fields: {distance: 1}}).zone();
	    	this.routes.subscribe(res=>{ 
	    		this.distance = 0;
	    		this.distance = res.reduce(function(acc, val) { return acc + (val.distance || 0) ; }, 0);
	    	});
		});

		this.interval = setInterval(()=>{
			let element = document.getElementById('colapser');
			if(element){
				let h = element.clientHeight;
				element.style.maxHeight = h +"px";
				element.style.height = h +"px";
				this.isSmall = true; 
				this.getNext();
				setTimeout(()=>{
					this.isSmall = false;
					setTimeout(()=>{
						let element = document.getElementById('colapser');
						if(element){
							element.style.maxHeight = null;
							element.style.height = null;				
						}
					}, 300);
				}, 300);
			}
		}, 8000);
	}

	getNext() {
		this.currentTextID = this.text.length - 1 < this.currentTextID + 1 ? 0 : this.currentTextID + 1;
	}

	ngOnDestroy(){
  		this.routesSub.unsubscribe();
  		clearInterval(this.interval);
   }
}