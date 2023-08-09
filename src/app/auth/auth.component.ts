import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  p: string = "";
  message!: string;
  hide: boolean = true;

  constructor(private authService: AuthService) { }

  authenticate(form: NgForm) {
    this.p = form.value.passwordInput;
    this.message = this.authService.authenticate(this.p);
  }
}