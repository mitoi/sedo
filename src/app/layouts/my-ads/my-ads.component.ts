import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from 'src/app/views/user-info/user-info.component';
@Component({
  selector: 'my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {
    showUserPersonalData: boolean = false;
    constructor() { }

    ngOnInit(): void {
    }

}
