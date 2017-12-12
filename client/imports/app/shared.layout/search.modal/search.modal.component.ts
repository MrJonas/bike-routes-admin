import { Component, Input, ViewChild , EventEmitter} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import template from "./search.modal.view.html";
import style from "./search.modal.style.scss";

import { Routes } from '../../../../../both/collections/routes.collection';
import { Route } from '../../../../../both/models/route.model';

import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';

import { LocationService } from "./../../services/app.routing.service";

@Component({
  selector: 'dm-search-modal',
  template,
  styles: [ style ]
})
export class SearchModalComponent {

    @ViewChild('childModal') public childModal:ModalDirective;

    routeSub: Subscription;
    routes: Observable<Route[]>;
    searchValue: string;

    myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

    constructor( private _router: LocationService) {}

	ngOnInit() {
			this.routeSub = MeteorObservable.subscribe('searchRoutes', this.searchValue).subscribe(() => {
	            this.routes = Routes.find({},{ sort: {score: "desc"} });
	        }, err=>{console.log(err);});
	}
	
	updateList() {
		this.routeSub.unsubscribe();
		this.routeSub = MeteorObservable.subscribe('searchRoutes', this.searchValue).subscribe(() => {
	        this.routes = Routes.find({},{ sort: {score: "desc"} });
	    }, err=>{console.log(err);});
	}

	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

    public showModal():void {
      this.childModal.show();
      setTimeout(()=>{ this.myFocusTriggeringEventEmitter.emit(true);}, 1000);
    }
 
    public hideModal():void {
      this.childModal.hide();
    }

    openRoute(url) {
    	this.hideModal();
    	this._router.goToRoutePage(url);
    }
}