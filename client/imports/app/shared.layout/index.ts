
import { FooterComponent } from './footer/footer.component.ts';
import { HeaderComponent } from './header/header.component.ts';
import { SearchModalComponent } from './search.modal/search.modal.component.ts';
import { FilterSearcPipe } from './search.modal/search.modal.route.filter.pipe.ts';
import { FocusDirective } from './directives/focus.directive.ts';
import {StickHeaderDirective} from "./header/header.stick.directive";


export const SHARED_LAYOUT_DECLARATIONS = [
	FooterComponent,
	HeaderComponent,
	StickHeaderDirective,
	SearchModalComponent,
	FilterSearcPipe,
	FocusDirective
];