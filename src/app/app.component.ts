import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private prodcutSer: ProductService) {}
  ngOnInit(): void {
    this.prodcutSer.getProductListJson().subscribe(
      (res: any) => {
        debugger
        this.prodcutSer.productList$.next(res?.productList);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  title = 'shopingAngu';
}
