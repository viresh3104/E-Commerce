import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CategoryFormComponent } from '../../../main/user/category-form/category-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showButton: boolean = false;

  constructor(private authservice: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.showButton = this.authservice.isAdmin();
  }

  OpencategoryForm() {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '38em',
      data: {},
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }
}
