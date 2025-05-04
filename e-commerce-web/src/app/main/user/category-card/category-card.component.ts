import { Component, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  categoryShowButton: boolean = false;
  @Input() category!: any;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // console.log('Category:', this.category); // Debug log
    this.categoryShowButton = this.authservice.isAdmin();
  }

  gotoCategory() {
    this.router.navigate(['../category', this.category.category_id], {
      relativeTo: this.activatedRoute,
    });
  }
}
