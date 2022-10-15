import { Component, Input, OnInit } from '@angular/core';
import { JobPosting } from 'src/app/model/JobPosting';
import { Router } from '@angular/router';

@Component({
    selector: 'app-job-grid-item',
    templateUrl: './job-grid-item.component.html',
    styleUrls: ['./job-grid-item.component.css'],
})
export class JobGridItemComponent implements OnInit {
    constructor(private _router: Router) {}
    
    primaryPhotoId: string = null;

    @Input()
    model!: JobPosting;

    ngOnInit(): void {
        if (this.model.photos instanceof Array && this.model.photos.length > 0) {
            this.primaryPhotoId = this.model.photos[0];
        }
    }

    async onClickItem() {
        const id: string = this.model._id;

        await this._router.navigate(['item', id], {
            queryParams: {
                category: this.model.category,
            },
        });
    }
}
