import { Component, Input, ViewChild, NgZone } from '@angular/core';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import template from "./header.view.html";
import style from "./header.style.scss";

import { LocationService } from "./../../services/app.routing.service";
import {HostListener} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'dm-header-component',
  template,
  styles: [ style ]
})
export class HeaderComponent {
    autorunComputation: Tracker.Computation;
    currentUser: Meteor.User;
    currentUserId: string;
    isLoggingIn: boolean;
    isLoggedIn: boolean;

    constructor(private zone: NgZone, private _router: LocationService){
        this._initAutorun();
    }

   public isCollapsed: boolean = true;
	
   ngOnInit() {}

   goToAboutPage() {
   	this._router.goToAboutPage();
   }

   toogleHeadbar() {
   	this.isCollapsed = !this.isCollapsed;
   }
   
   disableHeadbar() {
   	this.isCollapsed = true;
   }

    logout(): void {
        Meteor.logout();
        this._router.goToMainPage()
    }

    _initAutorun(): void {
        this.autorunComputation = Tracker.autorun(() => {
            this.zone.run(() => {
                this.currentUser = Meteor.user();
                this.currentUserId = Meteor.userId();
                this.isLoggingIn = Meteor.loggingIn();
                this.isLoggedIn = !!Meteor.user();
            })
        });
    }

    displayName(): string {
        let user : any = this.currentUser;

        if (!user)
            return '';

        if (user.profile && user.profile.name)
            return user.profile.name;

        if (user.username)
            return user.username;

        if (user.emails && user.emails[0] && user.emails[0].address)
            return user.emails[0].address;

        return '';
    };
}