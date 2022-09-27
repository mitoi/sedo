import { Component, Input, OnInit } from '@angular/core';
import { JobPosting } from 'src/app/model/JobPosting';
import {Router} from "@angular/router";

@Component({
  selector: 'app-job-grid-item',
  templateUrl: './job-grid-item.component.html',
  styleUrls: ['./job-grid-item.component.css']
})
export class JobGridItemComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  @Input()
  model!: JobPosting;

  ngOnInit(): void {
  }

  async onClickItem() {
    const id: string = this.model.id;

    await this._router.navigate(['item', id], {
      queryParams: {
        'category': this.model.category
      }
    });
  }

}
