import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Visit} from "../model/visit.model";

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private http: HttpClient) { }
  //baseUrl: string = 'http://localhost:8080/user-portal/users';
  
  baseUrl: string = 'http://localhost:3000/visits';
  getVisits() {
    
    return this.http.get<Visit[]>(this.baseUrl);
  }

  getVisitById(id: number) {
    return this.http.get<Visit>(this.baseUrl + '/' + id);
  }

  createVisit(visit: Visit) {
    return this.http.post(this.baseUrl, visit);
  }

  updateVisit(visit: Visit) {
    return this.http.put(this.baseUrl + '/' + visit.id, visit);
  }

  deleteVisit(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
  getPaginatedVisits(pageNo: any, itemsPerPage: any) {
    console.log("page no: ", pageNo, "items per page", itemsPerPage);
    const options = { params: new HttpParams().set('_page', pageNo).set('_limit', itemsPerPage) };
    return this.http.get<Visit[]>(this.baseUrl, options)
  }

  
}
