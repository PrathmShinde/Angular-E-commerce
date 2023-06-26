import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SellerAddProductComponent } from '../seller-add-product/seller-add-product.component';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuType : String = "default";
  sellerName : string = '';
  searchResult : undefined | product[];
  userName : string="";
  cartItems = 0;

  constructor(
    private router : Router,
    private _dialog : MatDialog,
    private productService : ProductService
    ){}

  ngOnInit() {
    this.router.events.subscribe((val:any) =>{
      if(val.url) {
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          // console.log("in seller area");
          this.menuType = 'seller';
          if(localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.name;
            // console.log(this.sellerName);
          }
        } else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData =  userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = "user";
          this.productService.getCartList(userData.id);
        } else {
          // console.log("Outside seller")
          this.menuType = "default";
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.productService.cartData.subscribe(item =>{
      this.cartItems = item.length;
    })
  }
  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth'])
    this.productService.cartData.emit([]);
  }
  
  openSellerAddComponent(){
    this._dialog.open(SellerAddProductComponent);
  }
  searchProduct(query : KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.productService.searchProducts(element.value).subscribe(res =>{ 
        if(res.length > 5){
            res.length = length;
        }
        this.searchResult = res;
      })
    }
  }
  hideSearch(){
    this.searchResult = undefined;
  }
  submitSearch(value : string){
    console.log(value);
    this.router.navigate([`search/${value}`]);
  }

  redirectToDetails(id : number){
    this.router.navigate(['/details/'+id])
  }
}
 