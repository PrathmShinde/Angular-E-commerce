import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addproduct!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private productService: ProductService,
    private _dialogRef: DialogRef,
    private _snackBarService : SnackbarService,
    public router : Router
  ) {
    this.addproduct = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productColor: ['', [Validators.required]],
      productCategory: ['', Validators.required],
      productImageUrl: ['', Validators.required],
      productDescription: ['', [Validators.required, Validators.minLength(50)]],
    });
  }
  addProduct() {
    this.productService.addProduct(this.addproduct.value).subscribe((res) => {
      if (res) {
        this._snackBarService.openSnackBar('Product added Successfully..!','done')
        this._dialogRef.close();
        this.router.navigate(['seller-home']);
      }
    });
  }
}
