import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  loggedIn: any;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.accountService.getLoggedInUser();
  }

  logout():void {
    this.accountService.logout(true);
  }

  addPost(): void {}
  addDonation(): void {}
  goToSettings(): void {}
}
