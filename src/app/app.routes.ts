import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { SignupComponent } from './components/signup.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
