import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators , FormArray, FormControl} from '@angular/forms';
import {Observable, Subscription, Subject} from "rxjs";
import { InjectUser } from "angular2-meteor-accounts-ui";
import {MeteorObservable} from "meteor-rxjs";
import { ImagesStore } from '../../../../../../../both/collections/images.collection';
import { Routes } from './../../../../../../../both/collections/routes.collection';
import { Images } from './../../../../../../../both/collections/images.collection';
import template from "./route.pictures.view.html";

import { remove } from './../../../../../../../both/methods/images.methods';

@Component({
    selector: 'dm-route-pictures',
    template
})
@InjectUser("user")
export class RoutePicturesComponent {

   @Input('group') public form: FormGroup;
   @Input('route') public route;

   imagesSubs: Subscription;
   selectedMainPhotoId = null;

   constructor(private _fb: FormBuilder) {}
	
   ngOnInit() {
   	this.imagesSubs = MeteorObservable.subscribe('images').subscribe();
   	    this.initSelectedImage();
   }

   onImage(imageId: string) {
    this.addNewImage(imageId);
   }

   ngOnDestroy() {
    this.imagesSubs.unsubscribe();
   }

   initSelectedImage() {
   	this.selectedMainPhotoId = null;
   	if(this.form.value.images && this.form.value.images.length >0 ){
   		this.form.value.images.forEach(item => {
   			if(item.main) {
   				this.selectedMainPhotoId = item.id;
   			}
   		})
   	}
   }

	initImageFormGroup(imageId) {
		return  this._fb.group({
	        id: [imageId, Validators.required],
	        main: [false]
	    });
	}

  addNewImage(id) {
  	const control = <FormArray>this.form.controls['images'];
    const addrCtrl = this.initImageFormGroup(id);
    control.push(addrCtrl);
    this.saveImages();
  }

  removeImage(i) {
  	let id = this.form.value.images[i].id;
  	const control = <FormArray>this.form.controls['images'];
    control.removeAt(i);
    this.saveImages();
    this.initSelectedImage();
    // console.log(id);
    remove(id);
  }

  sendImageUrlToClipBoard(id) {
  	let url = this.getImageUrl(id);
    console.log(url);
  	if(url){
  		this.setClipboardText(url);
  	}
  }

  getImageUrl(id) {
    const found = Images.findOne(id);
    if (found) {
        return `https://dviraciumarsrutai.lt/api/images/${found._id}`;
    }
    return null;
  }  

  saveImages() {

  	Routes.update(this.route._id, {
  		$set:{
        images: this.form.value.images
      }});

  }

  toogleMainPhoto(e, id) {
    this.selectedMainPhotoId = e.target.checked ? id : null;
    this.form.controls['main_image_id'].setValue(this.selectedMainPhotoId);
    this.form.controls['main_image_id'].markAsDirty();
  }


  setClipboardText(text){
    var id = "mycustom-clipboard-textarea-hidden-id";
    var existsTextarea = document.getElementById(id);

    if(!existsTextarea){
        var textarea = document.createElement("textarea");
        textarea.id = id;
        // Place in top-left corner of screen regardless of scroll position.
        textarea.style.position = 'fixed';
        textarea.style.top = 0;
        textarea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textarea.style.width = '1px';
        textarea.style.height = '1px';

        // We don't need padding, reducing the size if it does flash render.
        textarea.style.padding = 0;

        // Clean up any borders.
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textarea.style.background = 'transparent';
        document.querySelector("body").appendChild(textarea);
        existsTextarea = document.getElementById(id);
    } else {
    }

    existsTextarea.value = text;
    existsTextarea.select();

    try {
        var status = document.execCommand('copy');
        if(!status){
            //console.error("Cannot copy text");
        }else{
            console.log("Text copied to clipboard");
        }
    } catch (err) {
    }
}
}