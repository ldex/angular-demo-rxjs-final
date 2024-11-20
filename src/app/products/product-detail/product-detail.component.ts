import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, startWith, switchMap } from 'rxjs';

import { Product } from '../product.interface';
import { FavouriteService } from '../../services/favourite.service';
import { ProductService } from '../../services/product.service';
import { NgIf, AsyncPipe, UpperCasePipe, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css',
    imports: [NgIf, AsyncPipe, UpperCasePipe, CurrencyPipe, DatePipe]
})
export class ProductDetailComponent {

  @Input() product: Product;

  constructor(
    private favouriteService: FavouriteService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  newFavourite(product: Product) {
    this.favouriteService.addToFavourites(product);
    this.router.navigateByUrl('/products');
  }

  private idParamFromRoute$: Observable<number> = this.activatedRoute.params.pipe(
    filter(routeParams => routeParams.hasOwnProperty("id")), // Is there an id parameter ?
    map(routeParams => routeParams["id"]), // get the id parameter
    filter(id => !isNaN(id)), // filter numeric values ("9000" or 9000)
    map(id => Number(id)) // convert to number ("9000" -> 9000)
  ); // This will only emit if a valid id parameter is found!

  public product$: Observable<Product> = this.idParamFromRoute$.pipe(
    switchMap(
      id => this
              .productService
              .products$
              .pipe(
                map(products => products.find(p => p.id === id) ?? {} as Product), // no product found: returns an empty object
              )
    ),
    startWith({} as Product)
  );

  deleteProduct(id: number) {
    this.productService
        .deleteProduct(id)
        .subscribe({
           next: () => {
                console.log('Product deleted.');
                this.productService.resetList();
                this.router.navigateByUrl("/products");
            },
           error: e => console.log('Could not delete product. ' + e.message)
          }
        );
  }



}
