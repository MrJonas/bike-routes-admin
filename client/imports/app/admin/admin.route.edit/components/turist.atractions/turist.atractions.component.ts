import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";

import template from './turist.atractions.view.html';
import style from './turist.atractions.style.scss';

import { MAKI_ICON_LIST } from './../assets/icons.constant';

@Component({
    selector: 'dm-turist-atraction',
    template,
    styles: [ style ]
})
@InjectUser("user")
export class TuristAtractionsComponent {

   @Input('atractionForm') public atractionForm: FormGroup;

   ICONS = MAKI_ICON_LIST;

   ngOnInit() {}

   toogleIcon(icon) {
   	if(this.atractionForm.value.name == icon) {
   		(<FormControl>this.atractionForm.controls['icon']).setValue("");
   	} else {
   		(<FormControl>this.atractionForm.controls['icon']).setValue(icon);
   	}
   }

}