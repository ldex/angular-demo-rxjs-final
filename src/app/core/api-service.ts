import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { delay, Observable } from 'rxjs';
import { config } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly productsBaseUrl = config.productsApiUrl;

  private http = inject(HttpClient);

  getProducts(params: { [key: string]: string | number }): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsBaseUrl, {params}).pipe(delay(1500)); // Delay is for demo only...;
  }

  createProduct(product: Omit<Product, 'id'>) {
    return this.http.post<Product>(this.productsBaseUrl, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<void>(this.productsBaseUrl + id);
  }

}
