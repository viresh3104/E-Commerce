import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // for buttons
  signup(form: NgForm) {
    if (!form.valid) {
      return;
    }

    if (this.user.password != this.user.confirmpassword) {
      this.snackBar.open('⚠️ Confirm Password and Password Not Matching', '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snax-bar'],
      });
      this.user.password = '';
      this.user.confirmpassword = '';
      return;
    }
    console.log(
      'sending signup data',
      this.user.name,
      this.user.email,
      this.user.password
    );
    this.authService
      .signupService(this.user.name, this.user.email, this.user.password)
      .subscribe((response) => {
        console.log('singup response', response);
        this.snackBar.open('User Registered Successfully 🎯', '', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snax-bar'],
        });
        this.router.navigate(['/auth/login']);
      });
  }

  backTologin() {
    this.router.navigate(['auth/login']);
  }
}
