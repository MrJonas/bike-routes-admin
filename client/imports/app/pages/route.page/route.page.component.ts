import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {ViewEncapsulation} from '@angular/core';
import template from "./route.page.view.html";
import style from "./route.page.style.scss";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Routes } from './../../../../../both/collections/routes.collection';
import { Route } from './../../../../../both/models/route.model';
import { MetaService } from 'ng2-meta';
import {DisplayImagePipe} from "../../shared/display.image.pipe";

@Component({
  selector: 'dm-route-page',
  template,
  styles: [ style ],
  encapsulation: ViewEncapsulation.None,
    providers: [DisplayImagePipe]
})
export class RoutePageComponent {

   	private centerLat: number;
    private centerLng: number;
    private zoom: number;
    private path = [];
    private _showMap = false;

    routingNavigationSub: Subscription;
	paramsSub: Subscription;
    routeSub: Subscription;
    imagesSubs:Subscription;
    route: Route;
    id: String;
	
	constructor( private _route: ActivatedRoute , private _router: Router, private metaService: MetaService, private displayImage: DisplayImagePipe) {
        this.routingNavigationSub = _router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                window.scroll(0, 0);
            });
    }

	ngOnInit() {

        this.imagesSubs = MeteorObservable.subscribe('images').subscribe();

		    this.paramsSub = this._route.params
      .map(params => params['id'])
      .subscribe(id => {

        this.id = id;
        
        if (this.routeSub) {
          this.routeSub.unsubscribe();
        }
        this.routeSub = MeteorObservable.subscribe('oneRouteByUrl', this.id).subscribe(() => {
            this.route = Routes.findOne({url: this.id});
            this.metaService.setTitle(this.route.title);
            this.metaService.setTag('og:description', this.route.short_description);
            this.metaService.setTag('og:image', this.displayImage.transform(this.route.main_image_id));
            this.setMap();
        });

      });
	}

	ngOnDestroy() {
	  	this.routeSub.unsubscribe();
	  	this.paramsSub.unsubscribe();
  	}

  	ngAfterViewInit() {
  	    this._showMap = true;
    }

  	   setMap() {
   		try {
	    	this.path = JSON.parse(this.route.coordinates);
	    	this.zoom = JSON.parse(this.route.zoom);
	    	this.centerLat = JSON.parse(this.route.center_lat);
	    	this.centerLng = JSON.parse(this.route.center_lng);
		} catch(err) {

		}
   }

   ngOnDestroy() {
       this.routingNavigationSub.unsubscribe();
       this.imagesSubs.unsubscribe();
       this.routeSub.unsubscribe();
       this.paramsSub.unsubscribe();
   }

}