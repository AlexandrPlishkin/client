import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from './user';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {MatPaginator} from '@angular/material/paginator';
import {PageableUser} from './pageable-user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  pageUser: PageableUser;
  displayedColumns: string[] = ['userId', 'userNick', 'userName', 'userRole', 'Functions'];
  isLoadingResults = true;
  selectedPage = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getUsers(this.selectedPage);
  }

  getUsers(page: number): void {
    this.userService.getUsers(page)
      .subscribe(data => {
        this.users = data.content;
        this.pageUser = data;
        this.paginator.length = this.pageUser.totalElements;
        this.selectedPage = page;
        this.isLoadingResults = false;
        console.log(this.pageUser);
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

  isSelfDelete(username: string): boolean {
    return username === localStorage.getItem('username');
  }

  handlePage(event) {
    console.log(event);
    this.userService.getUsers(event.pageIndex).subscribe(pageUser => {
      this.users = pageUser.content;
      // console.log(this.users);
      this.pageUser = pageUser;
      this.selectedPage = event.pageIndex;
      this.isLoadingResults = false;
    });

  }
}
