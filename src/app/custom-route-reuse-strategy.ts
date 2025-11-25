import {ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

export class CustomRouteReuseStrategy extends BaseRouteReuseStrategy {
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // Reload when self navigating on the 'product-list' component
    if (future.routeConfig === curr.routeConfig && future.routeConfig?.path === 'products') {
      return false; // Force reload
    }
  }
}