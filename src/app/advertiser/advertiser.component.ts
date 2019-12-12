import {Component, OnInit} from '@angular/core';
import {Advertiser} from './advertiser';
import {AdvertiserService} from './advertiser.service';
import {ActivatedRoute, Router} from '@angular/router';
import {log} from "util";
import {User} from "../user/user";

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.css']
})
export class AdvertiserComponent implements OnInit {

  data: Advertiser[] = [];
  displayedColumns: string[] = ['advertiserId', 'advertiserName', 'advertiserEmail', 'advertiserOwner', 'Functions'];
  isLoadingResults = true;

  constructor(private advertiserService: AdvertiserService, private router: Router) {
  }

  ngOnInit() {
    this.getAdvertisers();
  }

  getAdvertisers(): void {
    this.advertiserService.getAdvertisers()
      .subscribe(advertisers => {
        this.data = advertisers;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  edit(user: User) {
    this.router.navigate(['advertisers-edit'], {state: user});
  }

  deleteAdvertiser(advertiserId: number) {
    this.advertiserService.deleteAdvertiser(advertiserId).subscribe(resp => console.log(resp));
    window.location.reload();
  }

  create() {
    this.router.navigate(['advertisers-edit']);
  }
}

