import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  categoryInitial = ['Clothing', 'Appliances', 'Healthy Food', 'Essentials'];

  constructor(private http: HttpClient, private router: Router) {}

  productList$ = new BehaviorSubject<any>([]);

  categoryList$ = new BehaviorSubject(this.categoryInitial);

  cartList$ = new BehaviorSubject<any>([]);

  getProductListJson() {
    return this.http.get('/assets/productlist.json');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.cartList$.next([]);
  }

}
