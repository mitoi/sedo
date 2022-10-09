import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
    @Output() querySearch = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}

    onClickSearch(searchText: string): void {
        this.querySearch.emit(searchText);
    }
}
