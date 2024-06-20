import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsListComponent } from '../products-list/products-list.component';
import { Product } from '../../../models/Product';
import { ProductsServiceService } from '../../../services/products/products-service.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private productService: ProductsServiceService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [this.data ? this.data.name : '', Validators.required],
      code: [this.data ? this.data.code : '', Validators.required],
      description: [this.data ? this.data.description : ''],
      price: [
        this.data ? this.data.price : null,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      amount: [
        this.data ? this.data.amount : null,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  onSave() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  save(): void {
    const request = {
      id: this.data ? this.data._id : null,
      name: this.formGroup.value.name,
      code: this.formGroup.value.code,
      category: this.formGroup.value.category,
      price: this.formGroup.value.price,  // Convertir a número
      amount:this.formGroup.value.amount, // Convertir a número
      description: this.formGroup.value.description,
    };
    try {
      if (!this.data) {
        this.productService.createProduct(request).subscribe(item => console.log(item));
      } else {
        this.productService.updateProduct(request).subscribe(item => console.log(item));
      }
      this.dialogRef.close(true);
    } catch (error) {
      console.log(error);
    }
  }
}