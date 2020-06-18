import {Component, HostListener, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {User} from '../user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileEditForm: FormGroup;
  data: User[];
  isLoadingResults = true;
  nick = '';
  username = '';
  role = '';
  matcher = new MyErrorStateMatcher();
  id = window.history.state.id;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    console.log('current user id = ', window.history.state.id);
    this.profileEditForm = this.formBuilder.group({
      id: [window.history.state.id],
      nick: [null, Validators.required],
      username: [window.history.state.username],
      password: [null, Validators.required],
      role: [null, Validators.required],
    });
    this.profileEditForm.patchValue((<User> window.history.state));
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    console.log('Processing beforeunload...');
    event.returnValue = false;
  }

  onFormSubmit(form: NgForm) {
    this.updateUser(form);
    console.log(form);
    this.goBack();
  }

  updateUser(user: any): void {
    this.userService.updateUser(user)
      .subscribe(user => {
        this.data = user;
        console.log(user);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  goBack() {
    this.router.navigate(['users']);
  }

}
