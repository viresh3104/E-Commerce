import { Component, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  categoryShowButton: boolean = false;
  products: any[] = [];
  @Input() category!: any;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.categoryShowButton = this.authservice.isAdmin();
    this.loadTopProducts();
  }

  gotoCategory() {
    this.router.navigate(['../category', this.category.category_id], {
      relativeTo: this.activatedRoute,
    });
  }

  loadTopProducts() {
    this.adminService
      .getProductsByCategory(this.category.category_id)
      .subscribe(
        (products) => {
          this.products = products.slice(0, 4);
          console.log(this.products);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
