import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { VisitService } from 'src/app/service/visit.service';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css']
})
export class AddVisitComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private visitService: VisitService) { }

  addForm: FormGroup;
  submitted = false;
  

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],     
      lastVisit: ['', Validators.required],
      doctorName: ['', Validators.required],
      comments: ['', Validators.required],
      nextVisit: ['', Validators.required],
      medicines: ['', Validators.required],
      others: ['', Validators.required],
    });

  }


 // convenience getter for easy access to form fields
 get f() { return this.addForm.controls; }

  onSubmit() {

    this.submitted = true;
   
    // stop here if form is invalid
    if (this.addForm.invalid) {
        return;
    }

    this.visitService.createVisit(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-visit']);
      });
  }

}
