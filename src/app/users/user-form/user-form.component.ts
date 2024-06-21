import { Component, Inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  formGroup!: FormGroup

  constructor(public dialogRef: MatDialogRef<UserService>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    if (!this.data) {
      this.formGroup = this.formBuilder.group({
        username: ["", Validators.required],
        name: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", Validators.required],
        phone: ["", Validators.required],
        password: ["", Validators.required],
        role: ["", Validators.required],
      });
    } else {
      this.formGroup = this.formBuilder.group({
        username: [this.data.username || "", Validators.required],
        name: [this.data.name || "", Validators.required],
        lastName: [this.data.lastName || "", Validators.required],
        email: [this.data.email || "", Validators.required],
        phone: [this.data.phone || "", Validators.required],
        password: [this.data.password || "", Validators.required],
        role: [this.data.role || "", Validators.required],
        status: [this.data ? this.data.status : false, Validators.required]
      });
    }


  }

  save(): void {
    if (this.formGroup.valid) {
      const userData = this.formGroup.value;
      if (this.data) {
        userData['id'] = this.data._id;
        console.log(userData);
        this.userService.updateUser(userData).subscribe(
          (response) => {
            console.log("Usuario editado exitosamente", response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.log("Error al editar al usuario", error);
          }
        );
      } else {
        this.userService.createUser(userData).subscribe(
          (response) => {
            console.log('Usuario creado exitosamente', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error al crear al usuario', error);
          }
        );
      }
    } else {
      console.error('El formulario no es válido');
      this.dialogRef.close(false);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
