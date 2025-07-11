import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  email = '';
  token ='';

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.email = localStorage.getItem('email') || '';
      this.token = localStorage.getItem('token') || '';
    }
    console.log(this.token)
  }
}
