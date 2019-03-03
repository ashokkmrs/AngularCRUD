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

  constructor(private router: Router, private visitService: VisitService, private userService: UserService) { }

  ngOnInit() {
    
    this.activeUser = this.userService.getActiveUser();
    this.visitService.getVisits()
      .subscribe( data => {
        this.visits = data;
      });
  }

  deleteVisit(visit: Visit): void {
    this.visitService.deleteVisit(visit.id)
      .subscribe( data => {
        window.alert("Successfully Deleted!");
        this.visits = this.visits.filter(u => u !== visit);
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
  
}
