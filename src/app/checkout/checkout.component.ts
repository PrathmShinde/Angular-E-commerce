import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { cart, order, priceSummary } from '../data-type';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  checkout!: FormGroup;
  totalPrice: number | undefined;
  cartData: cart[] | undefined;


  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private snackbar : SnackbarService
  ) {
    this.checkout = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.productService.currentCart().subscribe((res) => {
      let price = 0;
      this.cartData = res;
      res.forEach((item) => {
        if (item.quantity) {
          price = price + +item.productPrice * +item.quantity; //it convert string value to numeric value
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;
      console.log(this.priceSummary);
    });
  }

  checkOut() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.priceSummary.total) {
      let orderData: order = {
        ...this.checkout.value,
        totalPrice: this.priceSummary.total,
        userId,
        // id : undefined
      };
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.productService.deleteCartItems(item.id);
        }, 700);
      });

      this.productService.orderNow(orderData).subscribe((res) => {
        if (res) {
          this.snackbar.openSnackBar("Your order has been placed")
          setTimeout(() => {
            this.router.navigate(['my-orders']);
          }, 4000);
        }
      });
    }
  }
}
