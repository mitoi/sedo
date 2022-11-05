import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { JobPosting } from 'src/app/model/JobPosting';

import { ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-job-suggestions',
    templateUrl: './job-suggestions.component.html',
    styleUrls: ['./job-suggestions.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class JobSuggestionsComponent implements OnInit {
    category: any;
    postings: JobPosting[] = [];

    constructor(
        private route: ActivatedRoute,
        private breakpointObserver: BreakpointObserver,
        private postService: PostService,
    ) {
        this.category = this.route.snapshot.queryParams['category'];
    }

    ngOnInit(): void {
        this.loadJobs();
    }

    loadJobs(): void {
        this.postService.listPosts(this.category).subscribe({
            next: (data: any) => {
                if (
                    data instanceof HttpResponse &&
                    data.status == 200 &&
                    data.body
                ) {
                    let records = data.body.records;
                    this.postings = [...records];
                }
            },
            error: (err) => {
                this.postings = [];
            },
        });
    }
}
