import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  
  signup!: FormGroup;
  login!: FormGroup;
  showLogin : boolean = false;
  authError : string = "";

  constructor(
    public fb: FormBuilder,
    public seller: SellerService,
    private router: Router
  ) {
    this.signup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp() {
    this.seller.userSignUp(this.signup.value);
  }
  openLogin(){
  this.showLogin = true;
  }
  
  openSignUp(){
    this.showLogin = false;
  }
  sellerLogin(){
    this.authError = "";
    this.seller.userLogin(this.login.value);  
    this.seller.isLoginError.subscribe(error =>{
      if(error) {
        this.authError = "Email or password is Incorrect";

      }
    })  
}
}
