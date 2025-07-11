import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import axios from 'axios';
import { ExpenseCrudComponent } from '../expense-crud/expense-crud.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ExpenseCrudComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  email = '';
  token = '';
  userInfo: any = null;
  error: string = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.email = localStorage.getItem('email') || '';
      this.token = localStorage.getItem('token') || '';
      if (this.token == ''){
        this.logout()
      }
    }
    if (this.email && this.token) {
      axios.get(`http://localhost:8080/api/logins/by-email`, {
        params: { email: this.email },
        headers: { Authorization: `Bearer ${this.token}` }
      })
        .then(res => {
          if (res.data && res.data.error) {
            this.error = res.data.error;
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          } else {
            this.userInfo = res.data;
            this.cdr.markForCheck();
          }
        })
        .catch(err => {
          this.error = err.response?.data?.message || 'Failed to fetch user info.';
          this.cdr.markForCheck();
        });
    }
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
