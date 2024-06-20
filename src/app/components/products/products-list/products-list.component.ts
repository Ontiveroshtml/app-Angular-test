import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../models/Product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProductsServiceService } from '../../../services/products/products-service.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ConfirmationComponentComponent } from '../../confirmation-component/confirmation-component.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  productList!: MatTableDataSource<Product>;

  columnsHeader = ['date', 'name', 'price', 'amount', 'status', 'opciones'];

  constructor(
    private productService: ProductsServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productListMethod();
  }

  productListMethod(){
    try {
      this.productService.getProducst().subscribe((items: Product[]) => {
        this.productList = new MatTableDataSource(items);
        // console.log(items);
      });
    } catch (error) {
      console.log(error);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("the dialog is closed")
      if(result) {
        this.productListMethod()
      }
    })
  }

  editDialog(element: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("the dialog is closed")
      if(result) {
        this.productListMethod()
      }
    })
  }

  deleteDialog(_id:string) {
    const dialogRef = this.dialog.open(ConfirmationComponentComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("the dialog is closed")
      if(result) {
        this.deleteProduct(_id);
      }
    })
  }

  deleteProduct(_id:string){
    try{
      this.productService.deleteProduct(_id).subscribe(item=>console.log(item))
      this.productListMethod();

      }catch(error){
        console.log(error);
      }
  }
}
