import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  loggedIn: any;
  userType: any;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.accountService.userValue;
    if (this.loggedIn && this.loggedIn.user) {
        this.userType = this.loggedIn.user.type;
    }
  }

  logout():void {
    this.accountService._logoutForReal(true, false);
  }

  addPost(): void {
    this.router.navigate(['add_post']);
  }

  addDonation(): void {
    this.router.navigate(['add_post'], {queryParams: {category: 'donation'}});
  }

  goToSettings(): void {
    this.router.navigate(['settings']);
  }

  goToMyAds(): void {
      this.router.navigate(['my_ads']);
  }
}
