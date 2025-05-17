import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  allCategories: any[] = [];
  products: any[] = [];
  constructor(
    private adminService: AdminService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.userService.getAllCategories().subscribe(
      (Categories) => {
        this.allCategories = Categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
