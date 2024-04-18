import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartList: any = [];
  prodcutList: any = [];
  constructor(private prodService: ProductService,private router:Router) {}
  ngOnInit(): void {
    this.prodService.productList$.subscribe((res) => {
      this.prodcutList = res;
    });

    this.prodService.cartList$.subscribe((res) => {
      this.cartList = res;
    });
  }
  deleteCart(index: any) {
    this.cartList.splice(index, 1);
    this.prodService.cartList$.next(this.cartList);
  }
  updateCart() {
    let cl = [...this.cartList]
    this.prodService.cartList$.next(cl);
  }

  checkout() {
    let quantitymismatch = false;
    let avilquantity: any;
    let _prodcutList = [...this.prodcutList];
    this.cartList.forEach((el: any) => {
      this.prodcutList.forEach((e: any, i: any) => {
        if (el.id == e.id) {
          if (_prodcutList[i].quantity < el.quantity) {
            quantitymismatch = true;
            avilquantity = e;
          }else
          _prodcutList[i].quantity = _prodcutList[i].quantity - el.quantity;
        }
      });
    });
    if (quantitymismatch) {
      alert(
        'product not avil in that qunatity product name' +
          avilquantity?.name +
          'is avil in quantity' +
          avilquantity?.quantity +
          'pls select acc'
      );
    } else {
      this.prodService.productList$.next(_prodcutList);
      this.prodService.cartList$.next([]);
      alert("done")
      this.router.navigate(['/home'])
    }
  }
}
