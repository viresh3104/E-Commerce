import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'wishlist', component: UserWishlistComponent },
  { path: 'cart', component: UserCartComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: UserCartComponent },
  { path: 'orders', component: OrderDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
