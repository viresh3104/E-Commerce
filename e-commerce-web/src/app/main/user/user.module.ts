import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { UserRoutingModule } from './user.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // or MatMomentDateModule
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'; // Add this

@NgModule({
  declarations: [
    DashboardComponent,
    CategoryCardComponent,
    CategoryFormComponent,
    ProductFormComponent,
    ProductCardComponent,
    UserProfileComponent,
    UserCartComponent,
    UserWishlistComponent,
    CategoryDetailComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class UserModule {}
