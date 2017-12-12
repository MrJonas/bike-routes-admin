import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../../../../../both/collections/routes.collection';
import { Route } from '../../../../../both/models/route.model';
import { InjectUser } from "angular2-meteor-accounts-ui";
import template from './admin.route.list.view.html';
import { Subscription } from 'rxjs/Subscription';
//import style from './admin.route.edit.component.scss';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'admin-route-list',
  template
})	
@InjectUser("user")
export class AdminRoutesList implements OnInit {

  @ViewChild('createNewModal') public createNewModal;
  routesSub: Subscription;
  routes: Observable<Route[]>;

  constructor(private _router: Router) {}

  ngOnInit() {
  	this.routesSub = MeteorObservable.subscribe('routes').subscribe(() => {
        this.routes = Routes.find({},{ sort: {'sorting_date': -1}}).zone();
      }, err=>{console.log(err);});
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      let el = document.getElementsByClassName("st-right");
      if(el.length  > 0 ){
        el[0].setAttribute("style", "display: none;");
      }
    },2000);
  } 	 	 	

  ngOnDestroy(){
  	this.routesSub.unsubscribe();
    setTimeout(()=>{
      let el = document.getElementsByClassName("st-right");
      if(el.length  > 0 ){
        el[0].setAttribute("style", "display: inline;");
      }
    },2000);
  }


  goToEdit(id){
  	this._router.navigate(['admin/edit', id]);
  }

  showCreateNewModal() {
      this.createNewModal.showModal();
  }

  insertNewRoute(name){
  	Routes.insert({ title: name});
  }

}
