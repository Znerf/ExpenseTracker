import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { useRegisterMutation } from '../../store/api-slice';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstname = '';
  lastname = '';
  dob = '';
  password = '';
  repassword = '';
  email = '';

  errors: any = {};
  successMessage = '';

  register = useRegisterMutation();

  validate() {
    this.errors = {};
    if (!this.firstname.trim()) {
      this.errors.firstname = 'First name is required.';
    }
    if (!this.lastname.trim()) {
      this.errors.lastname = 'Last name is required.';
    }
    if (!this.email.trim()) {
      this.errors.email = 'Email is required.';
    }
    if (!this.dob) {
      this.errors.dob = 'Date of birth is required.';
    } else {
      const dobDate = new Date(this.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        this.errors.dob = age - 1 < 18 ? 'You must be at least 18 years old.' : undefined;
      } else {
        this.errors.dob = age < 18 ? 'You must be at least 18 years old.' : undefined;
      }
      if (!this.errors.dob) delete this.errors.dob;
    }
    if (!this.password || this.password.length < 8) {
      this.errors.password = 'Password must be at least 8 characters.';
    }
    if (this.password !== this.repassword) {
      this.errors.repassword = 'Passwords do not match.';
    }
  }

  onSignup() {
    this.validate();
    this.successMessage = '';
    if (Object.keys(this.errors).length > 0) {
      return;
    }
    this.register({
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      password: this.password,
      dateOfBirth: this.dob
    })
      .then((result: any) => {
        console.log(result)
        if (result && !result.error) {
          console.log(result)
          this.successMessage = 'You can now login.';
        } else {
          console.log(result)
          this.errors.api = 'Registration failed. Please try again2.';
        }
      })
      .catch(() => {
        this.errors.api = 'Registration failed. Please try again.';
      });
  }
}
