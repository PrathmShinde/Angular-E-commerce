import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  popularProducts: undefined | product[];
  trendyProducts : undefined | product[];
  continueShopping : undefined | product[];

  constructor(private productService : ProductService){}

  ngOnInit(){
    this.productService.popularProducts().subscribe(data=>{
      console.log(data);
      this.popularProducts = data;
    })
    this.productService.trendyProduct().subscribe(res =>{
      this.trendyProducts = res;
    })
    this.productService.continueShopping().subscribe(res =>{
      this.continueShopping = res;
    })
  }
}
