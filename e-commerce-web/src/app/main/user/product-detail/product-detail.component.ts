import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  productId!: string;
  productData: any = null;
  current_img: number = 0;
  footware: any[] = [
    'UK 6',
    'UK 6.5',
    'UK 7',
    'UK 7.5',
    'UK 8',
    'UK 8.5',
    'UK 9',
    'UK 9.5',
    'UK 10',
  ];
  Clothing: any[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  sections = [
    {
      title: 'Exchange Policy',
      content: 'You can exchange the product within 7 days of delivery.',
      open: false,
    },
    {
      title: 'Delivery Time',
      content:
        'Expected delivery within 3–5 business days. All purchases are subject to delivery fees. Standard delivery 4–9 business daysOrders are processed and delivered Monday–Friday excluding public holiday Nike Members enjoy free returns.',
      open: false,
    },
    {
      title: 'More Info',
      content:
        'This product is made from 100% organic cotton. The ® may appear once or twice on the tongue and/or sockliner as a result of a change implemented by Nike. The product you purchase may appear differently in this respect than the one depicted on Nike.com or NikeApp.',
      open: false,
    },
  ];
  selectedSize: string = '';
  Iswishlist: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.Iswishlist = this.userService.WishlistStatusInProductDeatil;
    console.log(this.Iswishlist);
    this.loadProduct();
  }

  loadProduct() {
    this.userService
      .getProductById(Number(this.productId))
      .subscribe((product) => {
        this.productData = product[0];
      });
  }

  nextImage() {
    if (this.current_img < this.productData.image_urls.length - 1) {
      this.current_img++;
    }
  }

  backImage() {
    if (this.current_img > 0) {
      this.current_img--;
    }
  }

  sendsize(size: string) {
    this.selectedSize = size;
    console.log(this.selectedSize);
  }

  cart() {
    if (this.selectedSize == '') {
      this.snackBar.open('Please select size', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: ['product-detail'],
      });
    } else {
      this.userService
        .addToCart(this.productData.product_id, this.selectedSize)
        .subscribe(() => {
          this.snackBar.open('Product Added to Cart', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['product-detail'],
          });
        });
    }
  }

  wishlist() {
    if (this.Iswishlist == true) {
      this.Iswishlist = false;
    } else {
      this.Iswishlist = true;
    }
  }

  toggleSection(section: any) {
    section.open = !section.open;
  }
}
