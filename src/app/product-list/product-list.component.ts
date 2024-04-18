import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../product.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: any;
  modalRef?: BsModalRef;
  productForm!: FormGroup;
  catList: any;
  isEdit: boolean = false;
  selectedProductId: any;
  selectedProductIndex: any;
  constructor(
    private productService: ProductService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.productService.productList$.subscribe((res) => {
      this.productList = res;
    });

    this.productService.categoryList$.subscribe((res) => {
      this.catList = res;
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  get getName() {
    return this.productForm.controls['name'];
  }
  get getPrice() {
    return this.productForm.controls['price'];
  }
  get getQuantity() {
    return this.productForm.controls['quantity'];
  }
  get getCategory() {
    return this.productForm.controls['category'];
  }

  submit() {
    let product = this.productForm.value;
    product['id'] = Guid.create();
    this.productList.push(product);
    this.productService.productList$.next(this.productList);
    alert('added');
    this.modalRef?.hide();
    this.productForm.patchValue({
      name: '',
      price: '',
      category: '',
      quantity: '',
    });
  }
  update() {
    let product = this.productForm.value;
    product['id'] = this.productList[this.selectedProductIndex].id;
    this.productList[this.selectedProductIndex] = product;
    this.productService.productList$.next(this.productList);
    alert('updated');
    this.modalRef?.hide();
    this.isEdit = false;
    this.productForm.patchValue({
      name: '',
      price: '',
      category: '',
      quantity: '',
    });
  }
  deleteProd(index: any) {
    this.productList.splice(index, 1);
    this.productService.productList$.next(this.productList);
  }
  edit(index: any, template: TemplateRef<void>) {
    this.isEdit = true;
    this.openModal(template);
    this.productForm.patchValue(this.productList[index]);
    this.selectedProductIndex = index;
  }
}
