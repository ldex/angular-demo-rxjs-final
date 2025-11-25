import { Component, computed, inject } from '@angular/core';
import { Product } from '../../models/product';
import { AsyncPipe, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';
import { map, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe, AsyncPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  product$: Observable<Product>;

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

  newFavourite(product: Product) {
    this.productService.addToFavourites(product);
    this.router.navigateByUrl('/products');
  }

  constructor() {
    const id = + this.activatedRoute.snapshot.params['id'];
    this.product$ = this
            .productService
            .products$
            .pipe(
              map(products => products.find(p => p.id == id))
            )
  }
}
