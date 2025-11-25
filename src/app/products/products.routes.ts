import { Routes } from "@angular/router";
import { ProductDetails } from "./product-details/product-details";
import { ProductList } from "./product-list/product-list";
import { ProductForm } from "./product-form/product-form";
import { Products } from "./products";

export const productsRoutes: Routes = [
    {
      path: '',
      component: Products,
      children: [
        { path: '', component: ProductList },
        { path: 'create', component: ProductForm },
        { path: ':id', component: ProductDetails }
      ]
    }
  ];