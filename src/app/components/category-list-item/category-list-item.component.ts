import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../model/Category";

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.css']
})
export class CategoryListItemComponent implements OnInit {

  constructor() { }

  @Input()
  item!: Category;

  ngOnInit(): void {
  }

  onClickCategory() {
    debugger;
  }
}
