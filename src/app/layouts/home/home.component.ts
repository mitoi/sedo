import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor() {}

    activeCategory = '';
    activeSearchQuery = '';

    ngOnInit(): void {}

    categoryChangedEvent(event: any): void {
      this.activeCategory = event;
    }

    searchByQuery(event: any): void {
      this.activeSearchQuery = event;
    }
}
