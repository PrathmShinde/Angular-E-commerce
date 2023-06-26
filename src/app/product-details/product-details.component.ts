import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productData: any | product[];
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId &&
      this.productService.getProduct(productId).subscribe((res) => {
        this.productData = res;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId == item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');

        if (user) {
          let userId = user && JSON.parse(user).id;
          this.productService.getCartList(userId);
          this.productService.cartData.subscribe((res) => {
            let item = res.filter(
              (item: product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.warn('user is logged In');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn(userId);
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        console.warn(cartData);
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

      console.warn(this.cartData);
      this.cartData &&
        this.productService.removeToCart(this.cartData.id).subscribe((res) => {
          if (res) {
            this.productService.getCartList(userId);
          }
        });
        this.removeCart = false;
    }
  }
}
