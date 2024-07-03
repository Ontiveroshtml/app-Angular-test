import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product'; // Asegúrate de que esta ruta es correcta
import { ProductsServiceService } from '../../services/products/products-service.service'; // Asegúrate de que esta ruta es correcta
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../products/product-form/product-form.component';
import { DetailSaleService } from '../../services/detai/detail-sale.service'; // Import the service

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  productList: Product[] = [];
  filteredProductList: Product[] = [];
  cart: Product[] = [];
  total: number = 0; 

  constructor(
    private productService: ProductsServiceService,
    public dialog: MatDialog,
    private detailSaleService: DetailSaleService // Inject the service
  ) {}

  ngOnInit(): void {
    this.productListMethod();
    this.detailSaleService.getProductSale().subscribe((products: Product[]) => {
      this.cart = products;
      this.calculateTotal();
    });
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
    this.detailSaleService.addProductSale(product); // Use the service to add product
  }

  calculateTotal(): void {
    this.total = this.cart.reduce((acc, product) => acc + product.price * product.amount, 0); // Multiply price by amount
  }

  placeOrder(): void {
    alert('La compra se ha realizado con éxito!');
    this.cart = [];
    this.total = 0;
  }
}