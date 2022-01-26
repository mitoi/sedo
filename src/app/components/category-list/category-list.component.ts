import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/Category";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  cols$: Observable<number> = this.breakpointObserver
                                  .observe([Breakpoints.Small, Breakpoints.XSmall])
                                  .pipe(
                                    map((result) => {
                                      if (result.breakpoints[Breakpoints.XSmall]) {
                                        return 3;
                                      } else if (result.breakpoints[Breakpoints.Small]) {
                                        return 6;
                                      } else {
                                        return 10;
                                      }
                                    }),
                                    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }


  items: Category[] = [
    {
      title: 'Imobiliare',
      icon: 'home'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Imobiliare',
      icon: 'home'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Imobiliare',
      icon: 'home'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Imobiliare',
      icon: 'home'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Imobiliare',
      icon: 'home'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Imobiliare',
      icon: 'home'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Imobiliare',
      icon: 'home'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Imobiliare',
      icon: 'home'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Imobiliare',
      icon: 'home'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
    {
      title: 'Auto',
      icon: 'directions_car'
    },
  ];
}
