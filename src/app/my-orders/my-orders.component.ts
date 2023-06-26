import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orderData : order[] | undefined;
  constructor(private productService : ProductService){}

  ngOnInit() {
    this.getOrderList();
  }
  
  cancelOrder(orderId : number | undefined){
    orderId && this.productService.cancelOrder(orderId).subscribe(res =>{
      this.getOrderList();

    })
  }  
 
  getOrderList(){
    this.productService.orderList().subscribe(res =>{
      this.orderData = res; 
  })
  }
}