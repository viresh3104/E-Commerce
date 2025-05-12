import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  allCategories: any[] = [];
  products: any[] = [];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.adminService.getAllCategories().subscribe(
      (Categories) => {
        this.allCategories = Categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
