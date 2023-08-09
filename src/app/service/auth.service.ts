import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private p: string = "bogie";
    authenticated: boolean = false;

    constructor(private router: Router) { }

    login() {
        this.router.navigate(['/login/']);
    }

    authenticate(p: string) {
        if (p == this.p) {
            this.authenticated = true;
            return "Success!";
        } else {
            this.authenticated = false;
            return "Failure";
        }
    }
}