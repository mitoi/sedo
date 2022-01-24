import { Component, Input, OnInit } from '@angular/core';
import { JobPosting } from 'src/app/model/JobPosting';

@Component({
  selector: 'app-job-grid-item',
  templateUrl: './job-grid-item.component.html',
  styleUrls: ['./job-grid-item.component.css']
})
export class JobGridItemComponent implements OnInit {

  constructor() { }

  @Input()
  model!: JobPosting;

  ngOnInit(): void {
  }

}
