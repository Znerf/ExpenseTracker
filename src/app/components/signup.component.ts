import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Sign Up</h2>
    <form (ngSubmit)="onSignup()" #signupForm="ngForm">
      <label>First Name:
        <input type="text" name="firstname" [(ngModel)]="firstname" required />
      </label>
      <br />
      <label>Last Name:
        <input type="text" name="lastname" [(ngModel)]="lastname" required />
      </label>
      <br />
      <label>Date of Birth:
        <input type="date" name="dob" [(ngModel)]="dob" required />
      </label>
      <br />
      <label>Password:
        <input type="password" name="password" [(ngModel)]="password" required />
      </label>
      <br />
      <label>Re-enter Password:
        <input type="password" name="repassword" [(ngModel)]="repassword" required />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  `,
})
export class SignupComponent {
  firstname = '';
  lastname = '';
  dob = '';
  password = '';
  repassword = '';

  onSignup() {
    // TODO: Call signup API
    if (this.password !== this.repassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signup:', this.firstname, this.lastname, this.dob, this.password);
  }
}
