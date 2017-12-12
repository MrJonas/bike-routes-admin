import { RoutePageComponent } from './route.page/route.page.component';
import { RouteListPageComponent } from './route.list.page/route.list.component';
import { showListPipe } from './route.list.page/route.list.filter.pipe';
import { AtractionsPipe } from './route.list.page/route.list.filter.atraction.pipe';
import { MainPageComponent } from './main.page/main.page.component';
import { AboutPageComponent } from './about.page/about.page.component';
import { DistanceCounterComponent } from './main.page/components/distance.counter/distance.counter.component';
import { NewestRouteComponent } from './main.page/components/newest.route/newest.route.component';
import { ShareThisPageComponent } from './main.page/components/share.this.page/share.this.page.component';
import {RouteListStateService} from "./route.list.page/route.list.component.state.service";


export const PAGES_DECLARATIONS = [
	RoutePageComponent,

	RouteListPageComponent,
	MainPageComponent,
	AboutPageComponent,
	showListPipe,
	AtractionsPipe,
	DistanceCounterComponent,
	NewestRouteComponent,
	ShareThisPageComponent
];


export const PAGES_SERVICES = [
	RouteListStateService
];