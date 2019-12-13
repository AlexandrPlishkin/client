import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {Advertiser} from "../advertiser/advertiser";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  data: User[] = [];
  displayedColumns: string[] = ['userId', 'userNick', 'userName', 'userRole', 'Functions'];
  isLoadingResults = true;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getUsers()
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(advertisers => {
        this.data = advertisers;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(resp => console.log(resp));
    window.location.reload();
  }

  edit(user: User) {
    this.router.navigate(['profile'], {state: user});
  }

}
