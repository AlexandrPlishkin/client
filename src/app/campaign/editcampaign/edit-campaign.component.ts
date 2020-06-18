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
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css']
})
export class EditCampaignComponent implements OnInit {

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
    console.log(window.history.state);
    this.campaignEditForm = this.formBuilder.group({
      id: [window.history.state.id],
      link: [null, Validators.required],
      content: [null, Validators.required],
      destinationCountries: [window.history.state.destinationCountries],
      languages: [window.history.state.languages],

    });
    this.campaignEditForm.patchValue((window.history.state as Campaign));
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    console.log('Processing beforeunload...');
    event.returnValue = false;
  }

  onFormSubmit(form: NgForm) {

    this.destinationCountries = form['destinationCountries'];
    this.languages = form['languages'];
    form['destinationCountries'] = this.destinationCountries.split(',');
    form['languages'] = this.languages.split(',');

    if (window.history.state.id) {
      console.log(form['destinationCountries']);
      console.log(form['languages']);
      this.updateCampaign(form);
      console.log(form);
    } else {
      this.createCampaign(form);
      console.log(form);
    }

    this.goBack();
  }

  updateCampaign(campaign: any): void {
    this.campaignService.updateCampaign((Number)(localStorage.getItem('advertiserId')), campaign)
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
