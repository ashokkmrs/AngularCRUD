import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {AddVisitComponent} from "./PatientDetails/add-visit/add-visit.component";
import {VisitsComponent} from "./PatientDetails/visits/visits.component";
import { EditVisitComponent } from './PatientDetails/edit-visit/edit-visit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'add-visit', component: AddVisitComponent },
  { path: 'list-visit', component: VisitsComponent },
  { path: 'edit-visit', component: EditVisitComponent },
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
