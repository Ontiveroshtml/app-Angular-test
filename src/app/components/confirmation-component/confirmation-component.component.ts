import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsListComponent } from '../products/products-list/products-list.component';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-confirmation-component',
  templateUrl: './confirmation-component.component.html',
  styleUrl: './confirmation-component.component.scss'
})
export class ConfirmationComponentComponent {

  constructor(
    public dialogRef:MatDialogRef<ConfirmationComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    this.dialogRef.close();
  }

  onCancel() {
    console.log("AQUI, PERO ACA");
  }

}
