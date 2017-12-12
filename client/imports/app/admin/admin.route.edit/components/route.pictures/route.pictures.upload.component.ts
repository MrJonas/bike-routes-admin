import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";

import template from "./route.pictures.upload.view.html";
import style from './route.pictures.upload.style.scss';

import { upload } from './../../../../../../../both/methods/images.methods';
import {Subject, Subscription, Observable} from "rxjs";
import {MeteorObservable} from "meteor-rxjs";
import {Thumb} from "../../../../../../../both/models/image.model";
import {Thumbs} from "../../../../../../../both/collections/images.collection";

@Component({
    selector: 'dm-route-pictures-upload',
    template,
  	styles: [ style ]
})
@InjectUser("user")
export class RoutePicturesUploadComponent {

  fileIsOver: boolean = false;
  uploading: boolean = false;
  filesArray: string[] = [];
  files: Subject<string[]> = new Subject<string[]>();
  thumbsSubscription: Subscription;
  thumbs: Observable<Thumb[]>;
  @Output() onFile: EventEmitter<string> = new EventEmitter<string>();
	
  ngOnInit() {
  	    this.files.subscribe((filesArray) => {
      MeteorObservable.autorun().subscribe(() => {
        if (this.thumbsSubscription) {
          this.thumbsSubscription.unsubscribe();
          this.thumbsSubscription = undefined;
        }

        this.thumbsSubscription = MeteorObservable.subscribe("thumbs", filesArray).subscribe(() => {
          this.thumbs = Thumbs.find({
            originalStore: 'images',
            originalId: {
              $in: filesArray
            }
          }).zone();
        });
      });
    });
  }


  fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

  onFileDrop(file: File): void {
    this.uploading = true;

    if(file.type != 'image/jpeg') {
      console.log('Wrong file format: ' + file.type);
      this.uploading = false;
      return;
    } else if (file.size /1024 > 300) {
      console.log('File is to big: ' + file.size / 1024 + ' kB');
      this.uploading = false;
      return;
    }

    upload(file)
      .then((result) => {
        this.uploading = false;
        this.addFile(result);
      })
      .catch((error) => {
        this.uploading = false;
        console.log(`Something went wrong!`, error);
      });
  }

  addFile(file) {
    this.filesArray.push(file._id);
    this.files.next(this.filesArray);
    this.onFile.emit(file._id);
  }

  reset() {
    this.filesArray = [];
    this.files.next(this.filesArray);
  }
}