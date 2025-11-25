import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../core/api-service';
import { Product } from '../models/product';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  delay,
  shareReplay,
  tap,
  first,
  map,
  mergeAll,
  BehaviorSubject,
  switchMap,
  of,
  filter,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiService = inject(ApiService);
  private router = inject(Router);

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  mostExpensiveProduct$: Observable<Product>;
  private loading = signal(false);
  readonly isLoading = this.loading.asReadonly();
  error = signal<string>(undefined);

  private favourites: Set<Product> = new Set();
  productsToLoad: number = 10;
  pageToLoad = 1;


  constructor() {
    this.initProducts();
    this.initMostExpensiveProduct();
  }

  private initMostExpensiveProduct() {
    this.mostExpensiveProduct$ =
      this
      .products$
      .pipe(
        filter(products => products.length > 0),
        switchMap(products => of(products).pipe(
            map(products => [...products].sort((p1, p2) => p1.price > p2.price ? -1 : 1)),
            mergeAll(),
            first()
          )
        )
      )
  }

  initProducts() {
    const params = {
        page: this.pageToLoad++,
        limit: this.productsToLoad,
        sortBy: 'modifiedDate',
        order: 'desc'
    }

    this
      .apiService
      .getProducts(params)
      .pipe(shareReplay())
      .subscribe(
        newProducts => {
          let currentProducts = this.productsSubject.value;
          this.productsSubject.next(currentProducts.concat(newProducts));
        }
      );
  }

  resetList() {
    this.productsSubject.next([]);
    this.pageToLoad = 1;
    this.initProducts();
  }

  createProduct(newProduct: Omit<Product, 'id'>): Promise<void> {
    this.apiService.createProduct(newProduct).subscribe({
      next: (product) => {
        console.log('Product saved on the server with id: ' + product.id);
      },
      error: (error) => {
        this.handleError(error, 'Failed to save product.');
        return Promise.reject();
      },
    });
    return Promise.resolve();
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted');
        this.resetList();
        this.router.navigateByUrl('/products');
      },
      error: (error) => this.handleError(error, 'Failed to delete product.'),
    });
  }

  addToFavourites(product: Product) {
    this.favourites.add(product);
  }

  getFavouritesCount(): number {
    return this.favourites.size;
  }

  private handleError(httpError: HttpErrorResponse, userMessage: string) {
    this.loading.set(false);
    let logMessage: string;
    if (httpError.error instanceof ErrorEvent) {
      logMessage = 'An error occurred:' + httpError.error.message;
    } else {
      logMessage = `Backend returned code ${httpError.status}, body was: ${httpError.error}`;
    }
    console.error(logMessage);
    this.error.set(userMessage);
  }
}
