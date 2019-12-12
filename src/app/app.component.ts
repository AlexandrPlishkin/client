import {Component} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private authService: AuthService) {
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.isLoggedIn = false;
    this.router.navigate(['login']);
  }

  viewAllUsers() {
    this.router.navigate(['users']);
  }

  title = 'client';
}
