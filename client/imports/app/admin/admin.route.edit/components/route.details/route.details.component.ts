import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { MAKI_ICON_MAIN_LIST } from './../assets/icons.main.constant';

import template from "./route.details.view.html";
import style from "./route.details.style.scss";

@Component({
    selector: 'dm-route-details',
    template,
  	styles: [ style ]
})
@InjectUser("user")
export class RouteDetailsComponent {

   icons = MAKI_ICON_MAIN_LIST;
   dt;

  @Input('group') public form: FormGroup;
	
   ngOnInit() {
   	this.dt = this.form.value.sorting_date;
   }

   toogleIcon(icon) {
   		if(this.form.value.main_icon == icon) {
   		(<FormControl>this.form.controls['main_icon']).setValue("");
   	} else {
   		(<FormControl>this.form.controls['main_icon']).setValue(icon);
   	}
   	this.form.markAsDirty();
   }

   setSortingDate(e) {
   	(<FormControl>this.form.controls['sorting_date']).setValue(e);
   	this.form.markAsDirty();
   }

   filterURL () {
       // let url = this.form.value.title
       //     .trim()
       //     .toLocaleLowerCase()
       //     .replace('ą', 'a')
       //     .replace('č', 'c')
       //     .replace('ę', 'e')
       //     .replace('ė', 'e')
       //     .replace('į', 'i')
       //     .replace('š', 's')
       //     .replace('ų', 'u')
       //     .replace('ū', 'u')
       //     .replace('ž', 'z')
       //     .replace(/[^0-9a-z ]/gi, '')
       //     .replace(/ +/gi, '_');
       // (<FormControl>this.form.controls['url']).setValue(url);
   }
}