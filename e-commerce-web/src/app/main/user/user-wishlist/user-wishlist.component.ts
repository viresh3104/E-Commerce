import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.scss'],
})
export class UserWishlistComponent {
  wishlist: any[] = [];

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit() {
    this.loadWishlistProducts();
  }

  loadWishlistProducts() {
    this.userservice.getWishlist().subscribe((wishlist) => {
      this.wishlist = wishlist;
    });
  }

  gotoDashboard() {
    this.router.navigate(['user/dashboard']);
  }
}
