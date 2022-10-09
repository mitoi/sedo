import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../model/Category';

@Component({
    selector: 'app-category-list-item',
    templateUrl: './category-list-item.component.html',
    styleUrls: ['./category-list-item.component.css'],
})
export class CategoryListItemComponent implements OnInit {
    @Output() categoryChanged = new EventEmitter<string>();

    constructor() {}

    @Input()
    item!: Category;

    ngOnInit(): void {}

    onClickCategory() {        
        this.categoryChanged.emit(this.item.type);
    }
}
