// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   constructor(private router: Router) {}

//   onLogin(): void {
//     // Add your authentication logic here
//     const isAuthenticated = true; // Replace with actual authentication result

//     if (isAuthenticated) {
//       this.router.navigate(['/dashboard']);
//     } else {
//       alert('Invalid credentials');
//     }
//   }
// }

import { Component } from '@angular/core';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private router: Router , private http : HttpClient) {}

  ngOnInit(): void {}


  login(){
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:5000/api/auth/login',loginData).subscribe({
      

    })

  }

  register() {
    this.router.navigate(['register']);
  }
}
