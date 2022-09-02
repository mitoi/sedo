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

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.accountService.getLoggedInUser();
  }

  logout():void {
    this.accountService.logout(true);
  }

  addPost(): void {
    this.router.navigate(['add_post']);
  }
  addDonation(): void {}
  goToSettings(): void {}
}
