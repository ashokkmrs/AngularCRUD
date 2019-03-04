import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {User} from "../model/user.model";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  //baseUrl: string = 'http://localhost:8080/user-portal/users';
  
  baseUrl: string = 'http://localhost:3000/users';
  activeUser: User;

  getUsers() {
    return this.http.get<User[]>(this.baseUrl)
  }

  getPaginatedUsers(pageNo: any, itemsPerPage: any) {
    console.log("page no: ", pageNo, "items per page", itemsPerPage);
    const options = { params: new HttpParams().set('_page', pageNo).set('_limit', itemsPerPage) };
    return this.http.get<User[]>(this.baseUrl, options)
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  searchUser(name: string) {
    console.log("search string is:", name);
    const options = { params: new HttpParams().set('q', name) };
    return this.http.get<any>(this.baseUrl, options)
  }

  setActiveUser(user: User) {
    this.activeUser = user;
  }

  getActiveUser() {
    return this.activeUser;
  }
}
