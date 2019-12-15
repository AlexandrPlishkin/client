import {Component, HostListener, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Campaign} from '../campaign';
import {CampaignService} from '../campaign.service';
import {Router} from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-editcampaign',
  templateUrl: './editcampaign.component.html',
  styleUrls: ['./editcampaign.component.css']
})
export class EditcampaignComponent implements OnInit {

  campaignEditForm: FormGroup;
  data: Campaign[];
  isLoadingResults = true;
  link = '';
  content = '';
  destinationCountries = '';
  languages = '';
  matcher = new MyErrorStateMatcher();
  id = window.history.state.id;

  constructor(private formBuilder: FormBuilder, private campaignService: CampaignService, private router: Router) {
  }


  ngOnInit() {
    console.log('current campaign id = ', this.id);
    this.campaignEditForm = this.formBuilder.group({
      id: [window.history.state.id],
      link: [null, Validators.required],
      content: [null, Validators.required],
      destinationCountries: [null, Validators.required],
      languages: [null, Validators.required],
    });
    this.campaignEditForm.patchValue((window.history.state as Campaign)); // fixme check casting
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    console.log('Processing beforeunload...');
    event.returnValue = false;
  }

  onFormSubmit(form: NgForm) {
    if (window.history.state.id) {
      this.updateCampaign(form);
      console.log(form);
    } else {
      this.createCampaign(form);
      console.log(form);
    }

    this.goBack();
  }

  updateCampaign(campaign: any): void {
    this.campaignService.updateCampaign(Number(localStorage.getItem('advertiserId')), campaign)
      .subscribe(campaign => {
        this.data = campaign;
        console.log(campaign);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  createCampaign(campaign: any): void {
    this.campaignService.createCampaign(Number(localStorage.getItem('advertiserId')), campaign)
      .subscribe(campaign => {
        this.data = campaign;
        console.log(campaign);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }


  goBack() {
    this.router.navigate(['campaigns']);
  }


}
