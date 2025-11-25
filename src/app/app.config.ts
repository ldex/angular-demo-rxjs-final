import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  RouteReuseStrategy,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withRouterConfig({onSameUrlNavigation: 'reload'})
    ),
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy}, // to force a reload of product-list component upon self-navigation
  ],
};
