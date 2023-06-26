import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails(){
    this.productService.currentCart().subscribe((res) => {
      this.cartData = res;
      let price = 0;
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
      // console.log(this.priceSummary);

      if(this.cartData.length === 0){
          this.router.navigate(['/']);
      }
    });
  }

  checkOut() {
    this.router.navigate(['checkout']) 
  }
  removeToCart(cartId : number | undefined){
    cartId && this.cartData && this.productService.removeToCart(cartId).subscribe((res) => {
          if (res) {
            this.loadDetails();
          }
        });
  }
}
