import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {VisitService} from "../../service/visit.service";
import {UserService} from "../../service/user.service";
import {Visit} from "../../model/visit.model";
import { User } from 'src/app/model/user.model';


@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  visits: Visit[];
  activeUser: User;
  visitCount: number;
  currentPage = 1;
  itemsPerPage = 2;

  constructor(private router: Router, private visitService: VisitService, private userService: UserService) { }

  ngOnInit() {
    
    this.activeUser = this.userService.getActiveUser();
    this.visitService.getVisits()
      .subscribe( data => {
        this.visitCount = data.length;
      });

      this.visitService.getPaginatedVisits(this.currentPage, this.itemsPerPage)
      .subscribe( data => {
        this.visits = data;
      });
      
  }

  deleteVisit(visit: Visit): void {
    this.visitService.deleteVisit(visit.id)
      .subscribe( data => {
        window.alert("Successfully Deleted!");
        this.visits = this.visits.filter(u => u !== visit);
        this.visitCount -= 1;
      }, error => {
        window.alert("Failed to delete user");
      })
  };

  editVisit(visit: Visit): void {
    localStorage.removeItem("editvisitId");
    localStorage.setItem("editVisitId", visit.id.toString());
    this.router.navigate(['edit-visit']);
  };

  addVisit(): void {
    this.router.navigate(['add-visit']);
  };

  pageChanged(event: any) {
    console.log("page changed is:", event.page);
    console.log("page changed event is:", event);
    // this.currentPage = event.page;
    this.visitService.getPaginatedVisits(event.page, this.itemsPerPage)
      .subscribe( data => {
        this.visits = data;
      });

  }

  countChanged(event: any) {
    console.log(event.target.value);
    this.itemsPerPage = event.target.value;
    this.visitService.getPaginatedVisits(1, event.target.value)
      .subscribe( data => {
        this.visits = data;
      });

  }
  
}
