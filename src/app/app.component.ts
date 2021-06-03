import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mca-test';
  products: any = [];
  domesticProducts: any = [];
  domesticCost : number = 0;
  importedProducts: any = [];
  importedCost : number = 0;

  constructor(private http:HttpClient){}


  ngOnInit(){
    this.http.get("/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1").subscribe((products)=> {
      this.products = products;
      this.domesticProducts = this.products.filter(product => product.domestic == true).sort((a, b) => a.name.localeCompare(b.name));
      this.importedProducts = this.products.filter(product => product.domestic == false).sort((a, b) => a.name.localeCompare(b.name));
      console.log(" Domestic:");
        this.domesticProducts.forEach(product => {
          this.domesticCost += product.price;
          console.log(`   ${product.name}`);
          console.log(`   Price: $${product.price.toFixed(1)}`);
          console.log(`   ${product.description.length > 30 ? product.description.slice(0,10) + '...' : product.description}` );
          console.log(`   Weight: ${product.weight ? product.weight + 'g' : 'N/A'}`);
        })
      console.log(" Imported:");
        this.importedProducts.forEach(product => {
        this.importedCost += product.price;
          console.log(`   ${product.name}`);
          console.log(`   Price: $${product.price.toFixed(1)}`);
          console.log(`   ${product.description.length > 30 ? product.description.slice(0,10) + '...' : product.description}` );
          console.log(`   Weight: ${product.weight ? product.weight + 'g' : 'N/A'}`);
        })
      console.log(`Domestic cost: $${this.domesticCost.toFixed(1)}`);
      console.log(`Imported cost: $${this.importedCost.toFixed(1)}`);
      console.log(`Imported count: ${this.domesticProducts.length}`);
      console.log(`Imported count: ${this.importedProducts.length}`);
    })
  }
}
