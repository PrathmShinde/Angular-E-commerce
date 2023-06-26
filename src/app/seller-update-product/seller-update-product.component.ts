import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { SnackbarService } from '../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent {
  updateproduct!: FormGroup;
  productData: product[] | any;

  constructor(
    public fb: FormBuilder, 
    private productService: ProductService,
    private _snackBarService: SnackbarService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.updateproduct = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productColor: ['', [Validators.required]],
      productCategory: ['', Validators.required],
      productImageUrl: ['', Validators.required],
      productDescription: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  ngOnInit(): void {
    let productID = this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(productID).subscribe((data) => {
      this.productData = data;
    });
  }
  updateProduct() {

    // console.log(this.updateproduct.value);
    this.productService.updateProduct(this.productData).subscribe((res) => {
      if (res) {
        console.log(res);
        this._snackBarService.openSnackBar('data updated succsessfully');
        this.router.navigate(['seller-home']);
        // console.log(this.productData.id);
      } else {
        console.log('something happen');
      }
    });
  }
}
