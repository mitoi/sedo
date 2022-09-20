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

    constructor(
        private route: ActivatedRoute,
        private breakpointObserver: BreakpointObserver,
        private postService: PostService,
        private _snackBar: MatSnackBar,
    ) {
        this.id = this.route.snapshot.params['id'];
        this.category = this.route.snapshot.queryParams['category'];

        this.buildGallery();

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

        this.galleryImages = [
            {
                small: 'https://www.akc.org/wp-content/uploads/2018/07/preventing-body-sensitivity.jpg',
                medium: 'https://www.akc.org/wp-content/uploads/2018/07/preventing-body-sensitivity.jpg',
                big: 'https://www.akc.org/wp-content/uploads/2018/07/preventing-body-sensitivity.jpg',
            },
            {
                small: 'https://umeandthekids.com/wp-content/uploads/2020/12/Why-You-Should-Get-a-Family-Dog-1.jpeg',
                medium: 'https://umeandthekids.com/wp-content/uploads/2020/12/Why-You-Should-Get-a-Family-Dog-1.jpeg',
                big: 'https://umeandthekids.com/wp-content/uploads/2020/12/Why-You-Should-Get-a-Family-Dog-1.jpeg',
            },
            {
                small: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202108/international_dog_day_2021_4_r_1200x768.jpeg?mhENil.rEsB2Wju30UDroUYKmJ4NfkX4&size=1200:675',
                medium: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202108/international_dog_day_2021_4_r_1200x768.jpeg?mhENil.rEsB2Wju30UDroUYKmJ4NfkX4&size=1200:675',
                big: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202108/international_dog_day_2021_4_r_1200x768.jpeg?mhENil.rEsB2Wju30UDroUYKmJ4NfkX4&size=1200:675',
            },
            {
                small: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/17/29/1500566326-gettyimages-512366437-1.jpg',
                medium: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/17/29/1500566326-gettyimages-512366437-1.jpg',
                big: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/17/29/1500566326-gettyimages-512366437-1.jpg',
            },
        ];
    }

    ngOnInit(): void {
        //this.model = this.getDemoData(this.id);
        this.fetchModel();
    }

    ngOnChanges(): void {}

    async fetchModel(): Promise<void> {
        this.postService.getPost(this.id).subscribe({
            next: (data: any) => {
              debugger
            },
            error: (error: any) => {
                this._snackBar.open('Anuntul tau a fost creat', 'Succes', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            },
        });
    }

    getDemoData(id: string): JobPosting {
        let data: JobPosting[] = [
            {
                id: '1',
                title: 'Construirea unui balcon',
                description:
                    'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
                date: new Date('2019-01-16'),
                location: 'Bucuresti, Romania',
                category: 'Constructii',
                user: {
                    id: 'userId',
                    type: 'client',
                    firstName: 'Ion',
                    email: 'ion@ion',
                    lastName: 'George',
                    rating: 5,
                    profilePic:
                        'https://umeandthekids.com/wp-content/uploads/2020/12/Why-You-Should-Get-a-Family-Dog-1.jpeg',
                },
                pictures: {
                    image1: 'https://www.akc.org/wp-content/uploads/2018/07/preventing-body-sensitivity.jpg',
                },
            },
            {
                id: '2',
                title: 'Construirea unui dsads',
                description:
                    'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
                date: new Date('2019-01-16'),
                location: 'Bucuresti, Romania',
                category: 'Constructii',
                user: {
                    id: 'userId',
                    type: 'client',
                    email: 'ion@ion',
                    firstName: 'Ion',
                    lastName: 'George',
                    rating: 5,
                    profilePic: '4343',
                },
            },
            {
                id: '3',
                title: 'Construirea unui balcon',
                description:
                    'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
                date: new Date('2019-01-16'),
                location: 'Bucuresti, Romania',
                category: 'Constructii',
                user: {
                    id: 'userId',
                    type: 'client',
                    email: 'ion@ion',
                    firstName: 'Ion',
                    lastName: 'George',
                    rating: 4,
                    profilePic:
                        'https://cdn.pixabay.com/photo/2013/03/01/18/40/crispus-87928_1280.jpg',
                },
            },
            {
                id: '4',
                title: 'Construirea unui balcon',
                description:
                    'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
                date: new Date('2019-01-16'),
                location: 'Bucuresti, Romania',
                category: 'Constructii',
                user: {
                    id: 'userId',
                    type: 'client',
                    firstName: 'Ion',
                    email: 'ion@ion',
                    lastName: 'George',
                    rating: 5,
                    profilePic: '4343',
                },
            },
            {
                id: '5',
                title: 'Construirea unui balcon',
                description:
                    'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
                date: new Date('2019-01-16'),
                location: 'Bucuresti, Romania',
                category: 'Constructii',
                user: {
                    id: 'userId',
                    type: 'client',
                    firstName: 'Ion',
                    email: 'ion@ion',
                    rating: 5,
                    lastName: 'George',
                    profilePic: '4343',
                },
            },
            {
                id: '6',
                title: 'Construirea unui balcon',
                description:
                    'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
                date: new Date('2019-01-16'),
                location: 'Bucuresti, Romania',
                category: 'Constructii',
                user: {
                    id: 'userId',
                    type: 'client',
                    firstName: 'Ion',
                    lastName: 'George',
                    email: 'ion@ion',
                    rating: 5,
                    profilePic: '4343',
                },
            },
        ];
        return data[Number(id) + 1];
    }
}
