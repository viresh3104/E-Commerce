import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) {}

  // Signup: Takes name, email, and password, makes POST request, stores response
  signupService(name: string, email: string, password: string) {
    const signUpData = { name, email, password };
    console.log(signUpData);
    return this.http.post(`${this.apiUrl}/signup`, signUpData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  // Login: Takes email and password, makes POST request, stores response
  loginService(email: string, password: string) {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  // for guards :)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); //!! to convert the result to a boolean
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role == 'admin';
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
