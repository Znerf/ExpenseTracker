import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
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
