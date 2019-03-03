import { Component, OnInit } from '@angular/core';
import {VisitService} from "../../service/visit.service";
import {Router} from "@angular/router";
import {Visit} from "../../model/visit.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['./edit-visit.component.css']
})
export class EditVisitComponent implements OnInit {

  visit: Visit;
  editForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private router: Router, private visitService: VisitService) { }

  ngOnInit() {
    let visitId = localStorage.getItem("editVisitId");
    if(!visitId) {
      alert("Invalid action.")
      this.router.navigate(['list-visit']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],     
      lastVisit: ['', Validators.required],
      doctorName: ['', Validators.required],
      comments: ['', Validators.required],
      nextVisit: ['', Validators.required],
      medicines: ['', Validators.required],
      others: ['', Validators.required],
    });
    this.visitService.getVisitById(+visitId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

 // convenience getter for easy access to form fields
 get f() { return this.editForm.controls; }


  onSubmit() {

    this.submitted = true;
   
    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    }

    this.visitService.updateVisit(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-visit']);
        },
        error => {
          alert(error);
        });
  }

}
