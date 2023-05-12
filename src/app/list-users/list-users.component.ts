import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../model/Users';
import { RegisterComponent } from '../register/register.component';
import { UsersService } from '../service/user.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users:User[]
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'username', 'email', 'role' , 'delete'];

  constructor(private userService : UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe( (res:any) => {
      let r : User[] = [] ;
      res.forEach((e:any) => {
        let roles = "";
        e.roles.forEach((role:any) => {roles +=  role.name + " " });
        r.push({
          ...e,
          role : roles
        })
      })
      this.dataSource.data = r;
    })
  }
  openAddModal(){
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      data: { user : null, isSuccessful: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.isSuccessful)
        this.dataSource.data = [...this.dataSource.data, result.user];

    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
    //  this.dataSource.data = this.dataSource.data.filter(u => (u as User).id !== user.id) as User[];
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
