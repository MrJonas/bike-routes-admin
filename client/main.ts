import 'angular2-meteor-polyfills';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './imports/app/app.module';

import '../both/methods/routes.methods';

if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
{
    var x = document.getElementsByClassName("loader-background");
    x[0].innerHTML = "<div class='text-center loader-text'>Puslapis nesuderinamas su Internet Explorer. Naudokite kitą naršyklę.</div>";
} else {
    const platform = platformBrowserDynamic();
    platform.bootstrapModule(AppModule);
}