import { Routes } from '@angular/router';
import { Home } from './shared/home';
import { Contact } from './shared/contact';
import { AppError } from './shared/app-error';
import { Admin } from './shared/admin';
import { NavError } from './shared/nav-error';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home},
    { path: 'contact', component: Contact },
    { path: 'admin', component: Admin },
    { path: 'products', loadChildren: () => import('./products/products.routes').then(r => r.productsRoutes)},
    { path: 'error', component: AppError },
    { path: '**', component: NavError },
];
