import { Routes } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductInsertComponent } from "./product-insert/product-insert.component";
import { ProductListComponent } from "./product-list/product-list.component";

export const productsRoutes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'insert', component: ProductInsertComponent },
    { path: ':id', component: ProductDetailComponent }
  ];