import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPosting } from '../../model/JobPosting';
import { merge, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {
    NgxGalleryAnimation,
    NgxGalleryImage,
    NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
    @Input()
    model!: JobPosting;
    id: string;
    category: string;
    itemPositionsLayout: Observable<number>;
    galleryOptions: NgxGalleryOptions[] = [];
    galleryImages: NgxGalleryImage[] = [];

    activeUser:any;

    constructor(
        private route: ActivatedRoute,
        private breakpointObserver: BreakpointObserver,
        private postService: PostService,
        private _snackBar: MatSnackBar,
        private _accountService: AccountService,
    ) {
        this.activeUser = this._accountService.userValue;
        this.id = this.route.snapshot.params['id'];
        this.category = this.route.snapshot.queryParams['category'];

        //still keep merge for the future
        this.itemPositionsLayout = merge(
            this.breakpointObserver
                .observe([Breakpoints.Small, Breakpoints.XSmall])
                .pipe(
                    map((result) => {
                        if (
                            result.breakpoints[Breakpoints.XSmall] ||
                            result.breakpoints[Breakpoints.Small]
                        ) {
                            return 1;
                        }

                        return 2;
                    })
                )
        );
    }

    buildGallery(): void {
        this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                previewCloseOnClick: true,
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '400px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20,
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false,
            },
        ];

        if (this.model.photos instanceof Array && this.model.photos.length > 0) {
            for (let photoId of this.model.photos) {
                this.galleryImages.push({
                    small: `http://localhost:3000/v1/getImage/${photoId}`,
                    medium: `http://localhost:3000/v1/getImage/${photoId}`,
                    big: `http://localhost:3000/v1/getImage/${photoId}`
                })
            }
        } else {
            this.galleryImages = [{
                small: `../../assets/No_Image_Available.jpeg`,
                medium: `../../assets/No_Image_Available.jpeg`,
                big: `../../assets/No_Image_Available.jpeg`
            }];         
        }
    }

    ngOnInit(): void {
        this.fetchModel();
    }

    ngOnChanges(): void {}

    fetchModel(): void {
        this.postService.getPost(this.id).subscribe({
            next: (data: any) => {
                if (data instanceof HttpResponse && data.body.error == false) {
                    this.model = data.body.record;
                    this.buildGallery();
                }
            },
            error: (error: any) => {
                this._snackBar.open('Eroare la afisarea anuntului', 'Eroare', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            },
        });
    }
}
