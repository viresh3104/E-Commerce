// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = null;
  profileForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      phoneNumber: [''],
      gender: [''],
      address: [''],
      dateOfBirth: [null],
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile().subscribe(
      (response) => {
        this.user = response;
        this.profileForm.patchValue({
          name: this.user.name || '',
          email: this.user.email || '',
          phoneNumber: this.user.phoneNumber || '',
          gender: this.user.gender || '',
          address: this.user.address || '',
          dateOfBirth: this.user.dateOfBirth || null,
        });
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updates = {
        name: this.profileForm.get('name')?.value,
        phoneNumber: this.profileForm.get('phoneNumber')?.value,
        gender: this.profileForm.get('gender')?.value,
        address: this.profileForm.get('address')?.value,
        dateOfBirth: this.profileForm.get('dateOfBirth')?.value,
      };
      this.userService.updateUserProfile(updates).subscribe(
        (response) => {
          this.user = response;
          this.isEditing = false;
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  enableEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.loadUserProfile();
  }

  goToDashboard() {
    this.router.navigate(['user/dashboard']);
  }
}
