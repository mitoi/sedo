import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import { JobPosting } from 'src/app/model/JobPosting';

import {ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-job-suggestions',
  templateUrl: './job-suggestions.component.html',
  styleUrls: ['./job-suggestions.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobSuggestionsComponent implements OnInit {
  category: any;
  postings: JobPosting[] = [];

  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) {
    this.category = this.route.snapshot.queryParams['category'];
  }

  ngOnInit(): void {
      this.loadJobs();
  }

  loadJobs(): void {
    this.postings = [
      {
        id: '1',
        title: 'Construirea unui balcon',
        description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
        date: new Date("2019-01-16"),
        location: 'Bucuresti, Romania',
        category: 'Constructii',
        user: {
          id: 'userId',
          type: 'client',
          firstName: 'Ion',
          email: 'ion@ion',
          lastName: 'George',
          rating: 5,
          profilePic: 'https://umeandthekids.com/wp-content/uploads/2020/12/Why-You-Should-Get-a-Family-Dog-1.jpeg'
        },
        pictures: {
            image1: 'https://www.akc.org/wp-content/uploads/2018/07/preventing-body-sensitivity.jpg'
        }
      },
      {
        id: '2',
        title: 'Construirea unui dsads',
        description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
        date: new Date("2019-01-16"),
        location: 'Bucuresti, Romania',
        category: 'Constructii',
        user: {
          id: 'userId',
          type: 'client',
          email: 'ion@ion',
          firstName: 'Ion',
          lastName: 'George',
          rating: 5,
          profilePic: '4343'
        }
      },
      {
        id: '3',
        title: 'Construirea unui balcon',
        description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
        date: new Date("2019-01-16"),
        location: 'Bucuresti, Romania',
        category: 'Constructii',
        user: {
          id: 'userId',
          type: 'client',
          email: 'ion@ion',
          firstName: 'Ion',
          lastName: 'George',
          rating: 4,
          profilePic: 'https://cdn.pixabay.com/photo/2013/03/01/18/40/crispus-87928_1280.jpg'
        }
      },
      {
        id: '4',
        title: 'Construirea unui balcon',
        description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
        date: new Date("2019-01-16"),
        location: 'Bucuresti, Romania',
        category: 'Constructii',
        user: {
          id: 'userId',
          type: 'client',
          firstName: 'Ion',
          email: 'ion@ion',
          lastName: 'George',
          rating: 5,
          profilePic: '4343'
        }
      },
      {
        id: '5',
        title: 'Construirea unui balcon',
        description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
        date: new Date("2019-01-16"),
        location: 'Bucuresti, Romania',
        category: 'Constructii',
        user: {
          id: 'userId',
          type: 'client',
          firstName: 'Ion',
          email: 'ion@ion',
          rating: 5,
          lastName: 'George',
          profilePic: '4343'
        }
      },{
        id: '6',
        title: 'Construirea unui balcon',
        description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
        date: new Date("2019-01-16"),
        location: 'Bucuresti, Romania',
        category: 'Constructii',
        user: {
          id: 'userId',
          type: 'client',
          firstName: 'Ion',
          lastName: 'George',
          email: 'ion@ion',
          rating: 5,
          profilePic: '4343'
        }
      }
    ];
  }

}
