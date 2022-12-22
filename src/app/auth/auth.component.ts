import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  u: string = "";
  p: string = "";
  message!: string;

  constructor(private authService: AuthService) { }

  authenticate(form: NgForm) {
    this.u = form.value.nameInput;
    this.p = form.value.passwordInput;
    this.message = this.authService.authenticate(this.u, this.p);
  }
}
