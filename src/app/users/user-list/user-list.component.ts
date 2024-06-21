import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmationComponentComponent } from '../../components/confirmation-component/confirmation-component.component';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  usersList!: MatTableDataSource<User>;

  columnsHeader = ['id', 'username', 'name', 'email', 'phone', 'status', 'opciones'];

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productListMethod();
  }

  productListMethod(): void {
    try {
      this.userService.getUsers().subscribe((items: User[]) => {
        this.usersList = new MatTableDataSource(items);
        // console.log(items);
      });
    } catch (error) {
      console.log(error);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersList.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("the dialog is closed")
      if(result) {
        this.productListMethod()
      }
    })
  }

  editDialog(element: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("the dialog is closed")
      if(result) {
        this.productListMethod()
      }
    })
  }

  deleteDialog(element: any) {
    const dialogRef = this.dialog.open(ConfirmationComponentComponent, {
      data: { type: 'deleteUser', element: element },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("the dialog is closed")
      if(result) {
        console.log(element)
        this.userService.deleteUser(element._id).subscribe(() => {
          this.productListMethod();
        });
      }
    })
  }
}
