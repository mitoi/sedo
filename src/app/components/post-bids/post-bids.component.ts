import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidService } from 'src/app/services/bid.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-post-bids',
    templateUrl: './post-bids.component.html',
    styleUrls: ['./post-bids.component.css'],
})
export class PostBidsComponent implements OnInit {
    @Input()
    postId: string;

    displayColumns: any = [
        'user',
        'email',
        'description',
        'date',
        'actions'
    ];
    dataSource: any = [];

    constructor(
        private _bidService: BidService,         
        public dialog: MatDialog,) {}

    ngOnInit(): void {
        this.loadBids(this.postId);
    }

    loadBids(postId: string) {
        this._bidService.getPostBids(postId).subscribe({
            next: (data) => {
                if (data && data.error == false && data.records) {
                    this.dataSource = data.records;
                }            
            },
            error: (err) => {},
        });
    }

    showPhone(element: any) {
        const phone = element.bidderUser.phone;
        const dialogData = new ConfirmDialogModel('Numar de telefon:', phone);

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData,
        });
    }
}
