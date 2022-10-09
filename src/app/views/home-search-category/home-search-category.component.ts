import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-home-search-category',
    templateUrl: './home-search-category.component.html',
    styleUrls: ['./home-search-category.component.css'],
})
export class HomeSearchCategoryComponent implements OnInit {
    @Output() categoryChanged = new EventEmitter<string>();
    @Output() queryChanged = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}

    categoryChangedEvent(event: any): void {
        this.categoryChanged.emit(event);
    }
    querySearch(event: any): void {
        this.queryChanged.emit(event);
    }
}
