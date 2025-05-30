import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,//COMPONENT CLASS NAME
    title: 'InStaff'
  },
  {
    path: 'calendar',
    component: CalendarComponent,//COMPONENT CLASS NAME
    title: 'InStaff'
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,//COMPONENT CLASS NAME
    title: 'InStaff'
  },
  {
    path: '**',
    component: NotFoundComponent,//COMPONENT CLASS NAME
    title: 'InStaff'
  },
]
