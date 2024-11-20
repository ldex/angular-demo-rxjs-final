import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './app/custom-route-reuse-strategy';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, AppRoutingModule),
        { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
