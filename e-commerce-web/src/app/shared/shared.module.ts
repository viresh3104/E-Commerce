import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog'; // Correct module import
@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
