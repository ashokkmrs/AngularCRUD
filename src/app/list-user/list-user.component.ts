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
  userCount: number;
  currentPage = 1;
  itemsPerPage = 2;
 

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.userCount = data.length;
      });

    this.userService.getPaginatedUsers(this.currentPage, this.itemsPerPage)
      .subscribe( data => {
        this.users = data;
      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        window.alert("Successfully Deleted!");
        this.users = this.users.filter(u => u !== user);
        this.userCount -= 1;

        
        /* this.userService.getUsers()
          .subscribe( data => {
            this.userCount = data.length;
          });
    
        this.userService.getPaginatedUsers(this.currentPage, this.itemsPerPage)
          .subscribe( data => {
            this.users = data;
          }); */

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
      this.userCount = data.length;
    });
  }

  setActiveUser(user: User) {
    this.userService.setActiveUser(user);
    this.router.navigate(['list-visit']);
  }

  pageChanged(event: any) {
    console.log("page changed is:", event.page);
    console.log("page changed event is:", event);
    // this.currentPage = event.page;
    this.userService.getPaginatedUsers(event.page, this.itemsPerPage)
      .subscribe( data => {
        this.users = data;
      });

  }

  countChanged(event: any) {
    console.log(event.target.value);
    this.itemsPerPage = event.target.value;
    this.userService.getPaginatedUsers(1, event.target.value)
      .subscribe( data => {
        this.users = data;
      });

  }
  
}
