import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  onLogin() {
    this.errorMessage = '';
    axios.post('http://localhost:8080/api/logins/login', {
      email: this.email,
      password: this.password
    })
      .then((response) => {
        if (response.data && (response.data.error )) {
          this.errorMessage = response.data.error;
        } else {
          console.log('Login success:', response.data);
        }
        this.cdr.markForCheck();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else if (error.message) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
        this.cdr.markForCheck();
      });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
