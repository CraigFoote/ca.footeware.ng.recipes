import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private u: string = "craig";
    private p: string = "chocolate";
    authenticated: boolean = false;

    constructor(private router: Router) { }

    login() {
        this.router.navigate(['/login/']);
    }

    authenticate(u: string, p: string) {
        if (u == this.u && p == this.p) {
            this.authenticated = true;
            return "Success!";
        } else {
            this.authenticated = false;
            return "Failure";
        }
    }
}