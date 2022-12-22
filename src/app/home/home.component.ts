import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'home-root',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    authService!: AuthService;

    constructor(authService: AuthService){
        this.authService = authService;
    }
}
