import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginButtons} from './login-buttons';
import {LoginWindowComponent} from './components';
import {AuthGuard} from "./annotations";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginButtons,
    LoginWindowComponent
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    LoginButtons,
    LoginWindowComponent
  ]
})
export class AccountsModule {
}
