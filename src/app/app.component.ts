import {Component} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {UserService} from "./user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  logout() {
    localStorage.clear();
    this.authService.isLoggedIn = false;
    this.router.navigate(['login']);
  }

  viewAllUsers() {
    this.router.navigate(['users']);
  }

  editProfile() {
    this.router.navigate(['profile']);
    this.userService.getUser(localStorage.getItem('username'));
  }

  viewAdvertisers() {
    this.router.navigate(['advertisers']);
  }

  // checkDatabase() {
  //   this.router.navigateByUrl('http://localhost:8080/h2-console')
  // }

  title = 'client';
}
