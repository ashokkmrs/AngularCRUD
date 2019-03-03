import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
 

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        window.alert("Successfully Deleted!");
        this.users = this.users.filter(u => u !== user);
      }, error => {
        window.alert("Failed to delete user");
      })
  };

  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

  viewUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };

  search(searchVar: any): void {
    console.log(searchVar.value);
    let userData: User[];
    this.userService.searchUser(searchVar.value).subscribe( data => {
      console.log("data is:")
      console.log(data);
      this.users = data;
    });
  }

  setActiveUser(user: User) {
    this.userService.setActiveUser(user);
    this.router.navigate(['list-visit']);
  }
}
