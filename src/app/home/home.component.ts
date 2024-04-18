import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: any;
  _productList: any;
  cartList: any = [];
  isLogin = false;
  constructor(public _ProductService: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.isLogin = localStorage.getItem('role') ? true : false;

    this._ProductService.productList$.subscribe((res) => {
      this.productList = res;
      this._productList = res;
    });
    this._ProductService.cartList$.subscribe((res) => {
      this.cartList = res;
    });
  }
  addCart(product: any) {
    if(product.quantity > 0){
    let p = {...product}
    p['quantity'] = 1;
    this._ProductService.cartList$.next([...this.cartList, p]);
  }else alert("product not avilable")
}
  gotoCart() {
    // considering if role avil in localstorage than its login for demo purpouse
    const role = localStorage.getItem('role');
    if (role == 'USER') {
      this.router.navigate(['/cart']);
    } else if (role == 'ADMIN') {
      alert('pls login with user Role');
    } else {
      alert('pls login first');
    }
  }
  selectFilter(cat: string) {
    this.productList = this._productList.filter(
      (el: any) => el.category == cat
    );
  }
}
