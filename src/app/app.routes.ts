import { Routes } from '@angular/router';
import { AdminComponent } from './shared/admin.component';
import { ContactComponent } from './shared/contact.component';
import { ErrorComponent } from './shared/error.component';
import { HomeComponent } from './shared/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'products', loadChildren: () => import('./products/products.route').then(m => m.productsRoutes)},
    { path: '**', component: ErrorComponent },
  ];