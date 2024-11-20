import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { provideRouter, RouteReuseStrategy, withRouterConfig } from '@angular/router';
import { CustomRouteReuseStrategy } from './app/custom-route-reuse-strategy';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule),
        { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(
          routes,
          withRouterConfig({ onSameUrlNavigation: "reload" })
        ),
    ]
})
  .catch(err => console.error(err));
