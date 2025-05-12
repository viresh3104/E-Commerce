import { Component, Input } from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: any;
  isAdmin: boolean = false;
  isWishlist: boolean = false;

  constructor(
    private authservice: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authservice.isAdmin();
    this.checkWishlistStatus();
  }

  checkWishlistStatus() {
    this.userService.getWishlist().subscribe(
      (wishlist) => {
        this.isWishlist = wishlist.some(
          (item: any) => item.product_id === this.product.product_id
        );
      },
      (error) => {
        console.error('Error checking wishlist:', error);
      }
    );
  }

  wishlist() {
    if (this.isWishlist) {
      this.userService.removeWishlist(this.product.product_id).subscribe(
        () => {
          this.isWishlist = false;
        },
        (error) => {
          console.error('Error removing from wishlist:', error);
        }
      );
    } else {
      this.userService.addToWishlist(this.product).subscribe(
        () => {
          this.isWishlist = true;
        },
        (error) => {
          console.error('Error adding to wishlist:', error);
        }
      );
    }
  }
}
