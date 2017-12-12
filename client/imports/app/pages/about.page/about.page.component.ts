import { Component, Input, ViewChild } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators , FormArray, FormControl} from '@angular/forms';

import template from "./about.page.view.html";
import style from "./about.page.style.scss";
import { MetaService } from 'ng2-meta';

@Component({
  selector: 'dm-about-page',
  template,
  styles: [ style ]
})
export class AboutPageComponent {

 @ViewChild('captchaRef') captchaRef;
  submited = false;
  loading = false;
  messageSend = false;
  contactForm: FormGroup;
  recapcha;
  recaptchaSize;

  constructor(private _fb: FormBuilder, private metaService: MetaService) {
      this.recaptchaSize = window.screen.width < 768 ? 'compact' : 'normal';
  }

  ngOnInit() {

    this.metaService.setTag('og:image', 'http://dviraciumarsrutai.lt/img/bike.jpg');

    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
   	this.contactForm = this._fb.group({
	      email: ["", <any>[<any>Validators.required,  <any>Validators.pattern(emailRegex) ]],
	      message: ["", <any>[<any>Validators.required, <any>Validators.minLength(10)]]
	  });
  }

  recapchaResolve(captchaResponse: string) {
      this.recapcha = captchaResponse;
  }

  captchaExpired() {
        this.recapcha = null;
  }

  resetRecapcha() {
      this.recapcha = null;
      this.captchaRef.reset();
  }

  contact() {
    this.submited = true;
    if(this.contactForm.valid && this.recapcha) {
      this.loading = true;
      MeteorObservable.call('contactAutors', this.contactForm.value, this.recapcha).subscribe(() => {
        this.loading = false;
        setTimeout(()=> { this.messageSend = true; }, 0);
        this.resetRecapcha();
      }, (error) => {
        this.loading = false;
        this.resetRecapcha();
      });
    }
  }

  ngOnDestroy() {
      setTimeout(()=> { this.messageSend = true; }, 0);
  }
}