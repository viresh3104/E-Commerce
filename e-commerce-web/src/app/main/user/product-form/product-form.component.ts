import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  productForm: FormGroup;
  selectedFiles: File[] = [];
  fileError: string | null = null;

  constructor(
    private formbuilder: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: string | number }
  ) {
    this.productForm = this.formbuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', [Validators.required, Validators.maxLength(50)]],
        brand: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(1)]],
        discountedPrice: [''],
        category_id: [data.categoryId, Validators.required],
      },
      { Validators: this.discountedPriceValidator }
    );
  }

  private discountedPriceValidator(form: FormGroup) {
    const discountedPrice = form.get('discountedPrice')?.value;
    const price = form.get('price')?.value;

    if (discountedPrice && price && Number(discountedPrice) > Number(price)) {
      form.get('discountedPrice')?.setErrors({ invalidDiscount: true });
      return { invalidDiscount: true };
    }
    form.get('discountedPrice')?.setErrors(null);
    return null;
  }

  onFileChange(event: Event) {
    const Input = event.target as HTMLInputElement;
    this.fileError = null;
    this.selectedFiles = [];

    if (Input.files && Input.files.length > 0) {
      const files = Array.from(Input.files);

      if (files.length > 7) {
        this.fileError = 'Maximum 7 images allowed';
        return;
      }

      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          this.fileError = 'Only image files are allowed';
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          this.fileError = `File ${file.name} exceeds 5MB limit`;
          return;
        }
      }
      this.selectedFiles = files;
    }
  }

  CretateProduct() {
    if (this.productForm.valid && !this.fileError) {
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.productForm.value));

      // Append multiple files
      this.selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      this.adminService.createProduct(formData).subscribe((res) => {
        this.snackBar.open('Product Added to cateogry', '', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snax-bar'],
        });
        this.dialogRef.close(res);
        console.log('product created successful');
      });
    }
  }
}
