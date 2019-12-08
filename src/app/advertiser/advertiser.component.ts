import {Component, OnInit} from '@angular/core';
import {Advertiser} from './advertiser';
import {AdvertiserService} from './advertiser.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.css']
})
export class AdvertiserComponent implements OnInit {

  data: Advertiser[] = [];
  displayedColumns: string[] = ['advertiserName', 'AdvertiserEmail'];
  isLoadingResults = true;

  constructor(private advertiserService: AdvertiserService, private authService: AuthService, private router: Router) {
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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}

