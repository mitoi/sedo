import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import { BidService } from 'src/app/services/bid.service';

@Component({
    selector: 'app-user-bids',
    templateUrl: './user-bids.component.html',
    styleUrls: ['./user-bids.component.css'],
})
export class UserBidsComponent implements OnInit {
    displayedColumns: string[] = ['post', 'description'];
    dataSource: any = [];

    constructor(
      private _bidService: BidService,
      private _accountService: AccountService,
      private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getUserBids();
    }

    getUserBids(): void {
        let activeUser = this._accountService.userValue.user;
        this._bidService.getUserBids(activeUser.id).subscribe({
            next: (data) => {
                if (data && data.error == false && data.records) {
                    this.dataSource = data.records;
                }
            },
            error: (err) => {
                console.log(err);
                this._snackBar.open('Eroare anunturi', 'Eroare', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            },
        });
    }
}
