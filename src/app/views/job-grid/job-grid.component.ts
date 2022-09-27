import { Component, OnInit } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { JobPosting } from '../../model/JobPosting';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';
@Component({
    selector: 'app-job-grid',
    templateUrl: './job-grid.component.html',
    styleUrls: ['./job-grid.component.css'],
})
export class JobGridComponent implements OnInit {
    cols$: Observable<number> = this.breakpointObserver
        .observe([Breakpoints.Small, Breakpoints.XSmall])
        .pipe(
            map((result) => {
                if (result.breakpoints[Breakpoints.XSmall]) {
                    return 1;
                } else if (result.breakpoints[Breakpoints.Small]) {
                    return 2;
                } else {
                    return 4;
                }
            }),
            shareReplay()
        );

    postings: JobPosting[] = [];

    constructor(
        private breakpointObserver: BreakpointObserver, 
        private postService: PostService, 
        private _snackBar: MatSnackBar,) {}

    ngOnInit(): void {
        this.loadPosts();
    }

    loadPosts(): void {
        this.postService.listPosts().subscribe({
            next: (data: any) => {
                if (data instanceof HttpResponse && data.status == 200 && data.body) {
                    this.postings = data.body.records;
                }
            },
            error: (err) => {
                this._snackBar.open('Eroare la incarcare anunturi', 'Eroare', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            }
        })
    }
}
