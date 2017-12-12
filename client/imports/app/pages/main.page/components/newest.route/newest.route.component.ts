import { Component, Input } from '@angular/core';

import template from "./newest.route.view.html";
import style from "./newest.route.style.scss";

import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Routes } from './../../../../../../../both/collections/routes.collection';
import { Route } from './../../../../../../../both/models/route.model';

import { LocationService } from "./../../../../services/app.routing.service";

@Component({
  selector: 'dm-newest-route',
  template,
  styles: [ style ]
})
export class NewestRouteComponent {

    routeSub: Subscription;
    route: Route;

	  constructor(private _router:LocationService) {}

   	ngOnInit() {
   	    this.routeSub = MeteorObservable.subscribe('latestRoute').subscribe(() => {
            this.route = Routes.findOne({});
        });
   	}

    ngOnDestroy() {
	  	this.routeSub.unsubscribe();
  	}

    openRoute(url) {
     this._router.goToRoutePage(url);
    }

    OpenRouteList() {
        this._router.goToRouteListPage();
    }
}