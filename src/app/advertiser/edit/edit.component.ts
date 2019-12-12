import {Component, OnInit} from '@angular/core';
import {Advertiser} from "../advertiser";
import {AdvertiserService} from "../advertiser.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  advertiserEditForm: FormGroup;
  data: Advertiser[];
  isLoadingResults = true;
  name = '';
  email = '';
  username = '';
  matcher = new MyErrorStateMatcher();
  id = window.history.state.id;

  constructor(private formBuilder: FormBuilder, private advertiserService: AdvertiserService, private router: Router) {
  }

  ngOnInit() {
    console.log('current advertiser id = ', window.history.state.id);
    this.advertiserEditForm = this.formBuilder.group({
      id: [window.history.state.id],
      name: [null, Validators.required],
      email: [null, Validators.required],
      username: [null, Validators.required],
    });
    this.advertiserEditForm.patchValue((<Advertiser>window.history.state));
  }

  onFormSubmit(form: NgForm) {
    this.updateAdvertiser(form);
    console.log(form);
    this.router.navigate(['advertisers']);

  };

  updateAdvertiser(advertiser: any): void {
    this.advertiserService.updateAdvertiser(advertiser)
      .subscribe(advertiser => {
        this.data = advertiser;
        console.log(advertiser);
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

  register() {
    this.router.navigate(['registration']);
  }

  return() {
    this.router.navigate(['advertisers'])
  }

}


