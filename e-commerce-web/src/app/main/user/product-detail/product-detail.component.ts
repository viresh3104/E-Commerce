import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  productId!: string;
  productData: any = null;
  current_img: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
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
}
