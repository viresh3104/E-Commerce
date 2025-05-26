import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  orders: any[] = [];
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.adminService.getorders().subscribe((res) => {
      this.orders = res;
      console.log(this.orders);
    });
  }
}
