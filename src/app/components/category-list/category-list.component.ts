import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Category, CategoryArray } from 'src/app/enums/category';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css'],
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
    public items: any;
    @Output() categoryChanged = new EventEmitter<string>();

    constructor(private breakpointObserver: BreakpointObserver) {}
    public categories = Object.values(Category);
    public CategoryArray = CategoryArray;

    ngOnInit(): void {
        this.items = CategoryArray;
    }

    changeCategories(event: any): void {
        this.items.map((category: { type: string; class: string | null }) => {
            if (category.type === event) {
                category.class = 'text-blue-400';
            } else {
                category.class = '';
            }
            return category;
        });
        this.categoryChanged.emit(event);
    }
}
