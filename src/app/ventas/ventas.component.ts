import { Component } from '@angular/core';
import { Ventas } from '../models/ventas';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {
  products: Ventas[] = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description 1', imageUrl: 'https://th.bing.com/th/id/OIP.WdmjTWGzOsFuYXP_0a3CnQHaHa?w=206&h=206&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2', imageUrl: 'https://th.bing.com/th/id/OIP.WdmjTWGzOsFuYXP_0a3CnQHaHa?w=206&h=206&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    { id: 3, name: 'Product 3', price: 30, description: 'Description 3', imageUrl: 'https://th.bing.com/th/id/OIP.WdmjTWGzOsFuYXP_0a3CnQHaHa?w=206&h=206&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    // Add more products as needed
  ];

  cart: Ventas[] = [];

  addToCart(ventas: Ventas): void {
    this.cart.push(ventas);
  }

  placeOrder(): void {
    alert('La compra se ha realizado con exito!');
    this.cart = [];
  }
}

