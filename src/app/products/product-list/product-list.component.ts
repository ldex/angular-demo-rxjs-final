import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl } from '@angular/forms';
import {
  Observable,
  EMPTY,
  combineLatest,
  Subscription,
  tap,
  catchError,
  startWith,
  count,
  map,
  debounceTime,
  filter,
} from 'rxjs';

import { Product } from '../product.interface';
import { ProductService } from '../../services/product.service';
import { FavouriteService } from '../../services/favourite.service';
import { NgIf, AsyncPipe, UpperCasePipe, SlicePipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        AsyncPipe,
        UpperCasePipe,
        SlicePipe,
        CurrencyPipe,
    ],
})
export class ProductListComponent implements OnInit {
  title: string = 'Products';
  selectedProduct: Product;
  products$: Observable<Product[]>;
  productsNumber$: Observable<number>;
  productsTotalNumber$: Observable<number>;
  mostExpensiveProduct$: Observable<Product>;
  hasMoreProducts$: Observable<boolean>;
  errorMessage;

  constructor(
    private productService: ProductService,
    private favouriteService: FavouriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$.pipe(
      filter((products) => products.length > 0)
    );

    this.productsTotalNumber$ = this.productService.productsTotalNumber$.asObservable();
    this.productsNumber$ = this.products$.pipe(
      map((products) => products.length),
      startWith(0)
    );

    this.hasMoreProducts$ = combineLatest([this.productsNumber$, this.productsTotalNumber$])
    .pipe(
      map(([productsNumber, productsTotalNumber]) =>
        productsNumber < productsTotalNumber
      )
    );

    this.mostExpensiveProduct$ = this.productService.mostExpensiveProduct$;
  }

  get favourites(): number {
    return this.favouriteService.getFavouritesNb();
  }

  // Pagination
  productsToLoad = this.productService.productsToLoad;
  pageSize = this.productsToLoad / 2;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  loadMore() {
    let skip = this.end;
    let take = this.productsToLoad;
    this.productService.initProducts(skip, take);
  }

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  reset() {
    this.productService.resetList();
    this.resetPagination();
  }

  resetPagination() {
    this.start = 0;
    this.end = this.pageSize;
    this.currentPage = 1;
  }
}
