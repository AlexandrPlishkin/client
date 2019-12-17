import {Component, OnInit} from '@angular/core';
import {Advertiser} from './advertiser';
import {AdvertiserService} from './advertiser.service';
import {Router} from '@angular/router';

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

  edit(advertiser: Advertiser) {
    this.router.navigate(['advertisers-edit'], {state: advertiser});
  }

  deleteAdvertiser(advertiserId: number) {
    this.advertiserService.deleteAdvertiser(advertiserId).subscribe(resp => console.log(resp));
    localStorage.removeItem('advertiserId');
    window.location.reload();
  }

  viewCampaigns(advertiser: Advertiser) {
    this.router.navigate(['campaigns'], {state: advertiser});
  }

  create() {
    this.router.navigate(['advertisers-edit']);
  }
}

