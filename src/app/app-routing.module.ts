import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './shared/home.component';
import { ContactComponent } from './shared/contact.component';
import { AdminComponent } from './shared/admin.component';
import { ErrorComponent } from './shared/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
