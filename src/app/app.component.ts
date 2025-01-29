import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './services/account.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, HomeComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'date-client';
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
