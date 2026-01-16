import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../models/product';
import { AsyncPipe, CurrencyPipe, JsonPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';
import { Router, RouterLink } from '@angular/router';
import { Observable, EMPTY, combineLatest, Subscription, tap, catchError, startWith, count, map, debounceTime, filter } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [UpperCasePipe, CurrencyPipe, JsonPipe, SlicePipe, AsyncPipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private router = inject(Router);
  private productService = inject(ProductService);

  products$: Observable<Product[]>;
  productsNumber$: Observable<number>;
  mostExpensiveProduct$: Observable<Product>;

  constructor() {
    this.products$ = this.productService.products$.pipe(filter(products => products.length > 0));

    this.productsNumber$ = this.products$.pipe(
      map(products => products.length),
      startWith(0)
    );

    this.mostExpensiveProduct$ = this.productService.mostExpensiveProduct$;
  }

  private pageSize = 5;
  protected start = 0;
  protected end = this.pageSize;
  protected pageNumber = 1;

  protected changePage(increment: number) {
    this.pageNumber = this.pageNumber + increment;
    this.start = this.start + increment * this.pageSize;
    this.end = this.start + this.pageSize;
  }

  loadMore() {
    this.productService.initProducts();
  }

  resetPagination() {
    this.start = 0;
    this.end = this.pageSize;
    this.pageNumber = 1;
  }

  get favourites(): number {
    return this.productService.getFavouritesCount();
  }

  protected selectProduct(product: Product) {
    this.router.navigate(['/products', product.id]);
  }

  reload() {
    this.productService.resetList();
    this.resetPagination();
  }
}
