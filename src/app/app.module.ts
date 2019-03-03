import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {routing} from "./app.routing";
import {AuthenticationService} from "./service/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {ListUserComponent} from "./list-user/list-user.component";
import {UserService} from "./service/user.service";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { VisitsComponent } from './PatientDetails/visits/visits.component';
import { AddVisitComponent } from './PatientDetails/add-visit/add-visit.component';
import { EditVisitComponent } from './PatientDetails/edit-visit/edit-visit.component';
import { VisitService } from './service/visit.service';
import {NgbModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    VisitsComponent,
    AddVisitComponent,
    EditVisitComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbDatepickerModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() 
  ],
  providers: [AuthenticationService, UserService, VisitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
