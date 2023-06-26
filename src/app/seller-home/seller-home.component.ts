import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { SellerUpdateProductComponent } from '../seller-update-product/seller-update-product.component';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private _snackBar: SnackbarService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((res) => {
      if (res) {
        this._snackBar.openSnackBar('Product deleted successfully');
        this.getList();
      }
    });
  }

  getList() {
    this.productService.productList().subscribe((result) => {
      this.productList = result;
      // console.log(this.productList);
    });
  }

}
