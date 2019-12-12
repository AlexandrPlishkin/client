import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Advertiser} from "../advertiser/advertiser";
import {User} from "./user";
import {AdvertiserService} from "../advertiser/advertiser.service";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  data: User[] = [];
  displayedColumns: string[] = ['userId', 'userNick', 'userName', 'userRole'];
  isLoadingResults = true;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
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

}
