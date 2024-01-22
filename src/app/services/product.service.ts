import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
import { Product } from '../products/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = `${environment.apiUrl}/products`;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();
  productsTotalNumber$: BehaviorSubject<number> = new BehaviorSubject(0);

  mostExpensiveProduct$: Observable<Product>;
  productsToLoad = 10;

  constructor(private http: HttpClient) {
    this.initProducts();
    this.initMostExpensiveProduct();
  }

  private initMostExpensiveProduct() {
    this.mostExpensiveProduct$ = this.products$.pipe(
      filter(products => products.length > 0),
      switchMap(
        products => of(products)
                      .pipe(
                        map(products => [...products].sort((p1, p2) => p1.price > p2.price ? -1 : 1)),
                        mergeAll(),
                        first()
                      )
      )
    );
  }

  initProducts(skip = 0, take = this.productsToLoad) {
    const params = {
      _start: skip,
      _limit: take,
      _sort: 'modifiedDate',
      _order: 'desc'
    }

    const options = {
      params: params,
      observe: 'response' as 'response' // in order to read params from the response header
    };

    this.http
      .get<Product[]>(this.baseUrl, options)
      .pipe(
        delay(1500),
        tap(response => {
          let count = response.headers.get('X-Total-Count') // total number of products
          if(count)
            this.productsTotalNumber$.next(Number(count))
        }),
        shareReplay()
    )
    .subscribe(
      (response: HttpResponse<Product[]>) => {
        let newProducts = response.body;
        let currentProducts = this.productsSubject.value;
        let mergedProducts = currentProducts.concat(newProducts);
        this.productsSubject.next(mergedProducts)
      }
    );
  }

  insertProduct(newProduct: Product): Observable<Product> {
    newProduct.modifiedDate = new Date();
    return this.http.post<Product>(this.baseUrl, newProduct).pipe(delay(2000));
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  resetList() {
    this.productsSubject.next([]);
    this.initProducts();
  }
}
