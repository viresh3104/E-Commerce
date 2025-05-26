import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
})
export class UserCartComponent {
  cart: any[] = [];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.userService.getCart().subscribe((product) => {
      this.cart = product;
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
    console.log('CART CLIKED REMOVE');
    this.userService
      .removeCart(product.productId, product.size)
      .subscribe(() => {
        this.loadCartItems();
      });
    console.log('CART CLIKED REMOVE');
  }

  getsubtotal() {
    return this.cart.reduce((total, item) => {
      // const price = item.product.discountedPrice ?? item.product.price, // Use discountedPrice if available
      const price = item.product.price,
        quantity = item.quantity;
      return total + price * quantity;
    }, 0);
  }

  // Dynamically load Razorpay SDK
  private loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('razorpay-script')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      document.body.appendChild(script);
    });
  }

  placeOrder() {
    if (!this.cart.length) {
      alert('Your cart is empty!');
      return;
    }

    const totalAmount = this.getsubtotal() + 1250;
    const minimalCartItems = this.cart.map((item) => ({
      productId: item.productId,
      size: item.size,
      quantity: item.quantity,
    }));

    this.userService
      .createOrder(totalAmount, minimalCartItems)
      .subscribe((orderRes) => {
        if (orderRes.message === 'Please add address in the user profile') {
          alert('Please add address in the user profile');
          this.router.navigate(['/user/profile']);
          return;
        }
        console.log('Razorpay key:', orderRes.key), // Debug log
          this.loadRazorpayScript().then(() => {
            const options = {
              key: orderRes.key,
              amount: orderRes.amount,
              currency: orderRes.currency,
              name: 'B-universal',
              description: 'Order Payment',
              order_id: orderRes.orderId,
              handler: (response: any) => {
                this.userService
                  .confirmOrder(
                    response.razorpay_order_id,
                    response.razorpay_payment_id,
                    totalAmount,
                    minimalCartItems
                  )
                  .subscribe(
                    () => {
                      alert('payment successful');
                      this.loadCartItems();
                    },
                    (error) => {
                      alert('payment failed');
                      console.error('Error confirming order:', error);
                    }
                  );
              },
              theme: {
                color: '#28a745',
              },
            };
            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
          });
      });
  }
}
