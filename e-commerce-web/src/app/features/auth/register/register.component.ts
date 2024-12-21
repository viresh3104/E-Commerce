import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private http: HttpClient) {}

  onRegister() {
    const userData = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
    };

    console.log("userData",userData);
    
    this.http.post('http://localhost:5000/api/auth/register', userData).subscribe(
      (response: any) => {
        console.log('User registered successfully', response);
      },
      (error: any) => {
        console.error('Error registering user', error);
      }
    );
  }
}
