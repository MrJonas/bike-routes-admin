import { 	AdminRoutesEdit,
			TuristAtractionsComponent, 
			RoutePathComponent, 
			RoutePicturesComponent, 
			RoutePicturesUploadComponent,
			RouteDetailsComponent,
			IconUrlPipe
		} from './admin.route.edit';
import { AdminRoutesList } from './admin.route.list/admin.route.list.component';
import {CreateNewModalComponent} from "./admin.route.list/components/create.new.modal/create.new.modal.component";
import {DeleteRouteModalComponent} from "./admin.route.list/components/delete.modal/delete.modal.component";
import {PublishRouteModalComponent} from "./admin.route.list/components/publish.modal/publish.modal.component";
import {UnpublishRouteModalComponent} from "./admin.route.list/components/unpublish.modal/unpublish.modal.component";
import {TuristAtractionsListComponent} from "./admin.route.edit/components/turist.atractions/turist.atractions.list.component";
export const ADMIN_DECLARATIONS = [
	AdminRoutesEdit,
	AdminRoutesList,
	TuristAtractionsComponent,
	RoutePathComponent,
	RoutePicturesComponent,
	RoutePicturesUploadComponent,
	RouteDetailsComponent,
	IconUrlPipe,
	CreateNewModalComponent,
	DeleteRouteModalComponent,
	PublishRouteModalComponent,
	UnpublishRouteModalComponent,
	TuristAtractionsListComponent
];
