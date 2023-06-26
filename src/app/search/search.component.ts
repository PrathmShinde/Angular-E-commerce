import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchResult : undefined | product[];
  searchWord : any;

  constructor(private activateRoute : ActivatedRoute, private productService : ProductService){}

  ngOnInit() {
    let query = this.activateRoute.snapshot.paramMap.get('query');
    console.log(query);
    this.searchWord = query;
    query && this.productService.searchProducts(query).subscribe(res =>{  
      this.searchResult = res;
    })
  }
}
