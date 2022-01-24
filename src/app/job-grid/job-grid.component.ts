import { Component, OnInit } from '@angular/core';
import { JobPosting } from '../model/JobPosting';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-job-grid',
  templateUrl: './job-grid.component.html',
  styleUrls: ['./job-grid.component.css']
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

  postings: JobPosting[] = [
    {
      title: 'Construirea unui balcon',
      description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
      date: new Date("2019-01-16"),
      location: 'Bucuresti, Romania',
      category: 'Constructii',
      user: {
        type: 'client',
        firstName: 'Ion',
        lastName: 'George',
        profilePic: '4343'
      }
    },
    {
      title: 'Construirea unui balcon',
      description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
      date: new Date("2019-01-16"),
      location: 'Bucuresti, Romania',
      category: 'Constructii',
      user: {
        type: 'client',
        firstName: 'Ion',
        lastName: 'George',
        profilePic: '4343'
      }
    },
    {
      title: 'Construirea unui balcon',
      description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
      date: new Date("2019-01-16"),
      location: 'Bucuresti, Romania',
      category: 'Constructii',
      user: {
        type: 'client',
        firstName: 'Ion',
        lastName: 'George',
        profilePic: '4343'
      }
    },
    {
      title: 'Construirea unui balcon',
      description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
      date: new Date("2019-01-16"),
      location: 'Bucuresti, Romania',
      category: 'Constructii',
      user: {
        type: 'client',
        firstName: 'Ion',
        lastName: 'George',
        profilePic: '4343'
      }
    },
    {
      title: 'Construirea unui balcon',
      description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
      date: new Date("2019-01-16"),
      location: 'Bucuresti, Romania',
      category: 'Constructii',
      user: {
        type: 'client',
        firstName: 'Ion',
        lastName: 'George',
        profilePic: '4343'
      }
    },{
      title: 'Construirea unui balcon',
      description: 'As dori servicii complete (proiectare, obținere autorizații si avize, design interior al locuinței după executarea balconului, eventual si lucrările de construcție si amenajate) pt construirea unui balcon la parterul unei clădiri din Bucuresti, sectorul 1.',
      date: new Date("2019-01-16"),
      location: 'Bucuresti, Romania',
      category: 'Constructii',
      user: {
        type: 'client',
        firstName: 'Ion',
        lastName: 'George',
        profilePic: '4343'
      }
    },
  ];


  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

}
