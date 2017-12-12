import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BsDropdownModule, ModalModule as ValorModalModule } from 'ng2-bootstrap';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { TabsModule } from 'ng2-bootstrap';
import { CollapseModule } from 'ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap';
import { PopoverModule } from 'ng2-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
import { FileDropModule } from "angular2-file-drop";
import { MetaModule, MetaConfig } from 'ng2-meta';
import { ReCaptchaModule } from 'angular2-recaptcha';


import { AccountsModule } from './login/';
import { AuthGuard } from "./login/annotations";

import { SHARED_DECLARATIONS } from './shared';
import { SHARED_LAYOUT_DECLARATIONS } from './shared.layout';

import { ADMIN_DECLARATIONS} from './admin';
import { PAGES_DECLARATIONS, PAGES_SERVICES} from './pages';

import { LocationService } from './services/app.routing.service';

import { routes, ROUTES_PROVIDERS } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule,
    Ng2PaginationModule,
    CKEditorModule,
    TabsModule.forRoot(),
    DatepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3nLhjKJovQ4x6HATXj9YNdMGu0LFDWpk'
    }),
    BsDropdownModule.forRoot(),
    FileDropModule,
    CollapseModule,
    ValorModalModule.forRoot(),
    PopoverModule.forRoot(),
    ReCaptchaModule,
    MetaModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...SHARED_DECLARATIONS,
	...ADMIN_DECLARATIONS,
    ...PAGES_DECLARATIONS,
    ...SHARED_LAYOUT_DECLARATIONS
  ],
  providers: [
    ...ROUTES_PROVIDERS,
    PAGES_SERVICES,
    LocationService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}