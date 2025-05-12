import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent {
  categoryId!: string;
  Products: any[] = [];
  Category: any = null; // Changed to single object, not array
  actions: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService,
    private dialog: MatDialog,
    private adminService: AdminService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    this.actions = this.authservice.isAdmin();
    this.loadProducts();
    this.loadCategory();
  }

  gotoDashboard() {
    this.router.navigate(['user/dashboard']);
  }

  openAddProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '38em',
      data: {
        categoryId: this.categoryId,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        // snackbar
      }
    });
  }

  loadProducts() {
    this.adminService.getProductsByCategory(Number(this.categoryId)).subscribe(
      (products) => {
        this.Products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  loadCategory() {
    this.userService.getCategory(Number(this.categoryId)).subscribe(
      (category) => {
        this.Category = category;
      },
      (error) => {
        console.error('Error fetching Category:', error);
      }
    );
  }
}
