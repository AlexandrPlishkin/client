import {Component, OnInit, ViewChild} from '@angular/core';
import {Advertiser} from './advertiser';
import {AdvertiserService} from './advertiser.service';
import {Router} from '@angular/router';
import {PageableAdvertiser} from './pageableAdvertiser';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.css']
})
export class AdvertiserComponent implements OnInit {

  data: Advertiser[] = [];
  pageAdvertiser: PageableAdvertiser;
  displayedColumns: string[] = ['advertiserId', 'advertiserName', 'advertiserEmail', 'advertiserOwner', 'Functions'];
  isLoadingResults = true;
  selectedPage = 0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private advertiserService: AdvertiserService, private router: Router) {
  }

  ngOnInit() {
    this.getAdvertisers(this.selectedPage);
    console.log(this.selectedPage);
    console.log(this.paginator);
  }

  getAdvertisers(page: number): void {
    this.advertiserService.getAdvertisers(page)
      .subscribe(pageAdvertiser => {
        this.data = pageAdvertiser.content;
        console.log(this.data);


        this.pageAdvertiser = pageAdvertiser;
        console.log(this.pageAdvertiser);
        this.paginator.length = this.pageAdvertiser.totalElements;
        this.selectedPage = page;
        this.isLoadingResults = false;
        console.log(this.paginator)
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

  handlePage(event) {
    // this.setQueryParams(event,null);
    // this.advertiserService.getAdvertisers(this.params).subscribe( data => {
    //   this.setData(data);

    console.log(event);
    this.advertiserService.getAdvertisers(event.pageIndex).subscribe(pageAdvertiser => {
      this.data = pageAdvertiser.content;
      console.log(this.data);
      this.pageAdvertiser = pageAdvertiser;
      this.selectedPage = event.pageIndex;
      this.isLoadingResults = false;
    });
  }
}

