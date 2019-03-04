import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../service/user.service";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {

  }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.maxLength(2)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      address: ['', Validators.required],
      visitdate: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required]
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
    //  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addForm.value));

    this.userService.createUser(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['list-user']);
      });

  }

  calculateAge(date1: any) {
    if (date1) {
      // console.log(date1);
      let dob = new Date(date1);
      let today = new Date();
      let timeDiff =(today.getTime() - dob.getTime()) / 1000;
      let days = timeDiff/(60 * 60 * 24);
      let years = Math.abs(Math.round(days/365.25));
      // console.log("years difference", years);
      this.addForm.get('age').setValue(years);
    }
  }

}
