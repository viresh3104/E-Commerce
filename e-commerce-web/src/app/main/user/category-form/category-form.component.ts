import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  categoryForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CategoryFormComponent>
  ) {
    this.categoryForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.maxLength(100)]],
    });
  }

  onCreate() {
    if (this.categoryForm.valid) {
      this.adminService
        .createCategory(this.categoryForm.value)
        .subscribe((res) => {
          this.snackBar.open(
            `${this.categoryForm.value.name} Category Cretated`,
            '',
            {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snax-bar'],
            }
          );
          this.dialogRef.close(res);
        }),
        () => {
          console.log('failed to create catgory, try again');
        };
    }
  }
}
