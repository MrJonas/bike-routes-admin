import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { PartiesListComponent } from './parties/parties-list.component';
import { PartyDetailsComponent } from './parties/party-details.component';

import { AdminRoutesEdit } from "./admin/admin.route.edit/admin.route.edit.component";
import { AdminRoutesList } from "./admin/admin.route.list/admin.route.list.component";

import { RoutePageComponent } from './pages/route.page/route.page.component';
import { RouteListPageComponent } from './pages/route.list.page/route.list.component';
import { MainPageComponent } from './pages/main.page/main.page.component';
import { AboutPageComponent } from './pages/about.page/about.page.component';

import { LoginWindowComponent } from "./login/components/login.window/login.window.component";
import {AuthGuard} from "./login/annotations";

export const routes: Route[] = [
  { path: '', component: LoginWindowComponent},
  // { path: 'party/:partyId', component: PartyDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'admin/edit/:id', component: AdminRoutesEdit, canActivate: [AuthGuard] },
  { path: 'admin/edit', component: AdminRoutesEdit, canActivate: [AuthGuard]  },
  { path: 'admin/list', component: AdminRoutesList, canActivate: [AuthGuard]  },
  { path: 'admin/login', component: LoginWindowComponent  },
  { path: '**', redirectTo: 'admin/login' }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
