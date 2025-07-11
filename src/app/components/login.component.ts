import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="onLogin()" #loginForm="ngForm">
      <label>Email:
        <input type="email" name="email" [(ngModel)]="email" required />
      </label>
      <br />
      <label>Password:
        <input type="password" name="password" [(ngModel)]="password" required />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
    <button (click)="goToSignup()">Sign up</button>
  `,
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    // TODO: Call login API
    console.log('Login:', this.email, this.password);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
