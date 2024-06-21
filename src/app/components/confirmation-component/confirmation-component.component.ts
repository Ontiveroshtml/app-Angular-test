import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-component',
  templateUrl: './confirmation-component.component.html',
  styleUrls: ['./confirmation-component.component.scss']
})
export class ConfirmationComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    this.dialogRef.close(true);  // Return true to indicate confirmation
  }

  onCancel(): void {
    this.dialogRef.close(false);  // Return false to indicate cancellation

  }
}
