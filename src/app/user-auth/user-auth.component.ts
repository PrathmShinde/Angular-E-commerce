import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { product, cart } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  usersignup!: FormGroup;
  userlogin!: FormGroup;
  showLogin: boolean = false;
  authError: string = '';

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private productService : ProductService
  ) {
    this.usersignup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.userlogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  userSignUp() {
    // console.log(this.usersignup.value);
    this.userService.userSignUp(this.usersignup.value);
  }
  openLogin() {
    this.showLogin = true;
  }
  openUserSignup() {
    this.showLogin = false;
  }
  userLogin() {
    this.userService.userLogin(this.userlogin.value);
    this.userService.inValidUserAuth.subscribe((result) => {
      console.log('Apple', result);
      if (result) {
        this.authError = 'Please Enter Valid user details';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList:product[] = JSON.parse(data);
      cartDataList.forEach((product: product,index : any) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(()=>{
          this.productService.addToCart(cartData).subscribe(result =>{
            if(result){
              console.warn("item store in DB")
            }
          })
          if(cartDataList.length === index+1){
            localStorage.removeItem('localCart');
          }
        },500);
      });
    }
    setTimeout(()=>{
      this.productService.getCartList(userId);
    },2000);
  }


  ngOnInit() {
    this.userService.userAuthReload();
  }
}
