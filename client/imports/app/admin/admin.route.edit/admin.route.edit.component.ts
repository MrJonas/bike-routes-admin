import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormBuilder, Validators , FormArray, FormControl} from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";
import template from './admin.route.edit.view.html';
//import style from './admin.route.edit.component.scss';
// import { CK_EDITOR_CONFIG } from './assets/ckeditor.config';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Images } from '../../../../../../both/collections/images.collection';
import { Routes } from './../../../../../both/collections/routes.collection';
import { Route } from './../../../../../both/models/route.model';

import './ckeditor/ckeditor.loader.ts';

@Component({
  selector: 'admin-route-edit',
  encapsulation: ViewEncapsulation.None,
  template
})
@InjectUser("user")
export class AdminRoutesEdit implements OnInit {

  private body_editor_content;
  private idea_editor_content;
  private cke_config = {
    uiColor: '#1976D2',  
    height: '425', 
    stylesSet : [
      {
          name : 'Jos nuomone',
          element : 'p',
          attributes: { 'class': 'comment-red'},
          styles :
          {
              'background-color' : '#f29f9f'
          }
      },      
      {
          name : 'Jo nuomone',
          element : 'p',
          attributes: { 'class': 'comment-blue'},
          styles :
          {
              'background-color' : '#7abcff'
          }
      }
    ]};


  addForm: FormGroup;

  paramsSub: Subscription;
  routeSub: Subscription;
  imagesSubs: Subscription;
  route: Route;
  id: String;

  private selectedTab;

  setTab(tab) {
  	this.selectedTab = tab;
  };

  constructor(
  	private _fb: FormBuilder,
  	private _route: ActivatedRoute,
  	private _router: Router
  ) {}

  ngOnInit() {
  	this.imagesSubs = MeteorObservable.subscribe('images').subscribe();

    this.paramsSub = this._route.params
      .map(params => params['id'])
      .subscribe(id => {

        this.id = id;
        
        if (this.routeSub) {
          this.routeSub.unsubscribe();
        }

        this.routeSub = MeteorObservable.subscribe('oneRoute', this.id).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.route = Routes.findOne(this.id);
            this.updateForm();
          }, err=>{console.log(err);});
        });

      });

  }

  ngAfterViewInit() {
    setTimeout(()=>{
      let el = document.getElementsByClassName("st-right");
      if(el.length  > 0 ){
        el[0].setAttribute("style", "display: none;");
      }
    },2000);
  }


  updateForm() {
  	if (this.route) {
	  	this.addForm = this._fb.group({
	      title: [this.route.title, Validators.required],
	      body: [this.route.body],
	      short_description: [this.route.short_description, Validators.required],
	      travel_date: [this.route.travel_date, Validators.required ],
	      sorting_date: [this.route.sorting_date, Validators.required ],
	      duration:[this.route.duration, Validators.required],
	      distance:[this.route.distance, Validators.required],
	      access_by_train: [this.route.access_by_train],
	      path:['', Validators.required],
	      atractions: this._fb.array([]),
	      images: this._fb.array([]),
	      url: [this.route.url],
        main_image_id: [this.route.main_image_id],
	      main_icon: [this.route.main_icon],
	      coordinates:  [this.route.coordinates],
	      map_zoom:  [this.route.zoom],
	      map_center_lat:  [this.route.center_lat],
	      map_center_lng:  [this.route.center_lng]
	    });


	  	if(this.route.atractions){
		    this.route.atractions.forEach(item => {
		    	const control = <FormArray>this.addForm.controls['atractions'];
		    	let new_atraction = this.initAtraction(item);
		    	control.push(new_atraction);
		    });
		}

		if(this.route.images) {
		  this.route.images.forEach(item => {
	    	const control = <FormArray>this.addForm.controls['images'];
	    	let new_image = this.initImageFormGroup(item);
	    	control.push(new_image);
	    	});
		}

	  	this.body_editor_content = this.route.body;
	  	this.idea_editor_content = this.route.idea_credit_to;
    }
  }

  ngOnDestroy() {
  	this.routeSub.unsubscribe();
  	this.paramsSub.unsubscribe();
    setTimeout(()=>{
      let el = document.getElementsByClassName("st-right");
      if(el.length  > 0 ){
        el[0].setAttribute("style", "display: inline;");
      }
    },1000);
  }

  saveRoute() {

  	Routes.update(this.route._id, {
  		$set:{
        title: this.addForm.value.title,
        body: this.body_editor_content,
        short_description: this.addForm.value.short_description,
        duration: this.addForm.value.duration,
        distance: this.addForm.value.distance,
        travel_date: this.addForm.value.travel_date,
        sorting_date: this.addForm.value.sorting_date,
        access_by_train: this.addForm.value.access_by_train,
        atractions: this.addForm.value.atractions,
        images: this.addForm.value.images,
        main_image_id: this.addForm.value.main_image_id,
        main_icon: this.addForm.value.main_icon,
        url: this.addForm.value.url,
    	coordinates: this.addForm.value.coordinates,
    	zoom: this.addForm.value.map_zoom,
    	center_lat: this.addForm.value.map_center_lat,
    	center_lng: this.addForm.value.map_center_lng,
    	idea_credit_to: this.idea_editor_content 
      }});

  	this.addForm.markAsPristine();

  }

  initAtraction(atraction) {
	return  this._fb.group({
            name: [atraction.name, Validators.required],
            description: [atraction.description],
            icon: [atraction.icon],
            lat: [atraction.lat],
            lng: [atraction.lng],
            show_only_in_map: [atraction.show_only_in_map]
    });
   }

    initImageFormGroup(image) {
		return  this._fb.group({
            id: [image.id, Validators.required],
            main: [image.main]
        });
    }

    publishRoute() {

  	Routes.update(this.route._id, {
  		$set:{
        published: true
      }});

  }

  unPublishRoute() {
  	Routes.update(this.route._id, {
  		$set:{
        published: false
      }});

  }

  deleteRoute() {

  	Routes.remove(this.route._id);
  	this._router.navigate(['admin/list']);
  }

  onCKEditorChange(e){
  	this.addForm.markAsDirty();
  }

}
