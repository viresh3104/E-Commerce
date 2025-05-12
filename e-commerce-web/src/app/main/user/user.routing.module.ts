import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { UserCartComponent } from './user-cart/user-cart.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userprofile', component: UserProfileComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'wishlist', component: UserWishlistComponent },
  { path: 'cart', component: UserCartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
