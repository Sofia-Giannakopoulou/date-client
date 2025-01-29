import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  registerMode = false;
  learnMoreMode = false; // Manage the visibility of the "Learn more" section

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  learnMoreToggle() {
    this.learnMoreMode = !this.learnMoreMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
