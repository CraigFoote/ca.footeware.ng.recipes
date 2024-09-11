import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authService!: AuthService;
  currentApplicationVersion = environment.appVersion;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
}
