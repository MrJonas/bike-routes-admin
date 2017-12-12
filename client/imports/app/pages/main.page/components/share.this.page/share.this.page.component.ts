import { Component, Input } from '@angular/core';

import template from "./share.this.page.view.html";
import style from "./share.this.page.style.scss";

@Component({
  selector: 'dm-share-this-page',
  template,
  styles: [ style ]
})
export class ShareThisPageComponent {

    private afterViewInit = false;

    ngOnInit() {}

    ngAfterViewInit() {
        this.afterViewInit = true;
    }
}