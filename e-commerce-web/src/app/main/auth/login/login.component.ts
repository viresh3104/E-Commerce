import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userD = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    this.authService
      .loginService(this.userD.email, this.userD.password)
      .subscribe({
        next: (response) => {
          this.snackBar.open(`Welcome Back, ${response.user.name} !`, '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snax-bar'],
          });
          this.router.navigate(['/user/dashboard']);
        },
        error: (err) => {
          this.snackBar.open('⚠︎ Wrong Email or Password, Try Again : )', '', {
            duration: 4000,
            horizontalPosition: 'start',
            verticalPosition: 'top',
            panelClass: ['snax-bar'],
          });
        },
      });
  }

  signup() {
    this.router.navigate(['auth/signup']);
  }

  fpass() {
    this.router.navigate(['auth/fpass']);
  }
}
