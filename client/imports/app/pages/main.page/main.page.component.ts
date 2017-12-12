import { Component, Input } from '@angular/core';

import template from "./main.page.view.html";
import style from "./main.page.style.scss";
import { MetaService } from 'ng2-meta';

@Component({
  selector: 'dm-main-page',
  template,
  styles: [ style ]
})
export class MainPageComponent {

    constructor(private metaService: MetaService) {}
	
   ngOnInit() {
       this.metaService.setTag('og:image', 'http://dviraciumarsrutai.lt/img/bike.jpg');
   }
}