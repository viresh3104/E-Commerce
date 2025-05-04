import { Component, Input } from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: any;
  isAdmin: boolean = false;

  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authservice.isAdmin();
  }
}
