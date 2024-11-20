import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductInsertComponent } from './product-insert/product-insert.component';

@NgModule({
    exports: [ProductListComponent],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ProductDetailComponent,
        ProductListComponent,
        ProductInsertComponent
    ]
})
export class ProductsModule { }
