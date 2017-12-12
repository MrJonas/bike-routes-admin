import { Component, Input } from '@angular/core';

import template from "./footer.view.html";
import style from "./footer.style.scss";

@Component({
  selector: 'dm-footer-component',
  template,
  styles: [ style ]
})
export class FooterComponent {
	
   ngOnInit() {}
}