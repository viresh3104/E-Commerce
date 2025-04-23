import { Component, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  categoryShowButton: boolean = false;
  @Input() category!: any;

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.categoryShowButton = this.authservice.isAdmin();
  }
}
