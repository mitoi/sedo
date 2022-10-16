import { Component, Input, OnInit } from '@angular/core';
import { BidService } from 'src/app/services/bid.service';

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

    constructor(private _bidService: BidService) {}

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
}
