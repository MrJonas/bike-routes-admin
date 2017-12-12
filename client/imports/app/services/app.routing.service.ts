import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class LocationService {

  constructor( private router: Router){}

  public goToMainPage(): void {
    this.router.navigateByUrl('/');
  }

  public goToRoutePage(url: String): void {
    this.router.navigateByUrl('/marsrutas/' + url);
  }

  public goToRouteListPage(): void {
    this.router.navigateByUrl('/marsrutai');
  }

  public goToAboutPage(): void {
    this.router.navigateByUrl('/apie');
  }

  public goToAdminRouteListPage(): void {
    this.router.navigateByUrl('/admin/list');
  }

  public goToAdminRrouteEditPage(id): void {
    this.router.navigateByUrl('/admin/edit/' + id);
  }
}
