import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CategoryFormComponent } from '../../../main/user/category-form/category-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showButton: boolean = false;

  constructor(
    private authservice: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showButton = this.authservice.isAdmin();
  }

  OpencategoryForm() {
    this.dialog.open(CategoryFormComponent, {
      width: '38em',
      data: {},
    });
  }

  goToWishlist() {
    this.router.navigate(['../wishlist'], {
      relativeTo: this.activatedRoute,
    });
  }

  goToCart() {
    this.router.navigate(['../cart'], {
      relativeTo: this.activatedRoute,
    });
  }

  gotoprofile() {
    this.router.navigate(['../profile'], {
      relativeTo: this.activatedRoute,
    });
  }
}
