import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
})
export class UserCartComponent {
  cart: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.userService.getCart().subscribe((product) => {
      this.cart = product;
      console.log(this.cart);
    });
  }

  updateQuantity(product: any, change: number) {
    const newQuantity = product.quantity + change;
    if (newQuantity < 1) return;
    this.userService
      .updateQuantity(product.productId, product.size, newQuantity)
      .subscribe(() => {
        this.loadCartItems();
      });
  }

  removeFromCart(product: any) {
    this.userService
      .removeCart(product.productId, product.size)
      .subscribe(() => {
        this.loadCartItems();
      });
  }

  getsubtotal() {
    return this.cart.reduce((total, item) => {
      const price = item.product.price,
        quantity = item.quantity;
      return total + price * quantity;
    }, 0);
  }
}
