import { Component, OnInit } from '@angular/core';
import { Ventas } from '../../models/ventas';
import { ProductsServiceService } from '../../services/products/products-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../products/product-form/product-form.component';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {
  productList: Product[] = [];
  filteredProductList: Product[] = [];
  cart: Product[] = [];
  total: number = 0; // Variable para almacenar el total de la compra

  constructor(
    private productService: ProductsServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productListMethod();
  }

  productListMethod(): void {
    this.productService.getProducst().subscribe((items: Product[]) => {
      this.productList = items;
      this.filteredProductList = items;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProductList = this.productList.filter(product =>
      product.name.toLowerCase().includes(filterValue) ||
      product.price.toString().includes(filterValue) ||
      product.amount.toString().includes(filterValue)
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.productListMethod();
      }
    });
  }

  addToCart(product: Product): void {
    this.cart.push(product);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cart.reduce((acc, product) => acc + product.price, 0);
  }

  placeOrder(): void {
    alert('La compra se ha realizado con éxito!');
    this.cart = [];
    this.total = 0; // Reiniciar el total después de realizar la compra
  }
}