import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Product } from '../product.interface';
import { FavouriteService } from '../favourite.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

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

  ngOnInit(): void {
    const id = + this.activatedRoute.snapshot.params['id'];
    this
      .productService
      .products$
      .pipe(
        map(products => products.find(p => p.id === id))
      )
      .subscribe(
        product => this.product = product
      )
  }

}
