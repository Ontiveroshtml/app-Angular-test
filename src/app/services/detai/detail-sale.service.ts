import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class DetailSaleService {
  private productList: Product[] = [];
  private products: BehaviorSubject<Product[]>;

  constructor() {
    this.products = new BehaviorSubject<Product[]>([]);
  }

  getProductSale() {
    return this.products.asObservable();
  }

  addProductSale(product: Product) {
    product.amount = 1; // Ensure the product amount is set to 1
    this.productList.push(product); // Add new product regardless of existing products
    this.products.next(this.productList);
    console.log("Carrito actualizado:", this.productList); // Print cart state to console
  }

  deleteProductSale(id: string) {
    const index = this.productList.findIndex(item => item._id === id);
    if (index > -1) {
      this.productList.splice(index, 1);
      this.products.next(this.productList);
      console.log("Carrito actualizado:", this.productList); // Print cart state to console
    }
  }
}