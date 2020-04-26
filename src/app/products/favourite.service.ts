import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor() { }

  private addedFavourite = new BehaviorSubject<Product>(null);
  addedFavourite$: Observable<Product> = this.addedFavourite.asObservable();

  private favourites: Set<Product> = new Set();

  addToFavourites(product: Product) {
    this.favourites.add(product);
    this.addedFavourite.next(product);
  }

  getFavouritesNb(): number {
    return this.favourites.size;
  }

  resetAddedFavourite() {
    this.addedFavourite.next(null);
  }
}
