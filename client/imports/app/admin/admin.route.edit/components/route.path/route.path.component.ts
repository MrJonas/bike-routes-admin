import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";

import template from "./route.path.view.html";
import style from './route.path.style.scss';

@Component({
    selector: 'dm-route-path',
    template,
    styles: [ style ]
})
@InjectUser("user")
export class RoutePathComponent {

   @Input('group') public form: FormGroup;

   zooms = [7,8,9,10,11,12,13,14,15,16];

   centerLat: number = 54.70295;
   centerLng: number = 25.310127;
   zoom: number = 13;
   path = [];	

   constructor() {}

   ngOnInit() {
   	this.setPath();
   	this.zoom = parseInt(this.form.value.map_zoom) ||  13;
   	this.centerLat = parseFloat(this.form.value.map_center_lat) || 54.70295;
   	this.centerLng = parseFloat(this.form.value.map_center_lng) || 25.310127;
   }

   setPath() {
	   	try {
	    	this.path = JSON.parse(this.form.value.coordinates);
	    	this.form.controls['coordinates'].setErrors({ "wrongCoordinates": false });
		} catch(err) {
			this.form.controls['coordinates'].setErrors({ "wrongCoordinates": true });
		    this.path = [];
		}
   }

   saveMap() {
   	this.form.markAsDirty();
   }

    centerChange(e) {
    	this.centerLat = e.lat;
   		this.centerLng = e.lng;
    }
}