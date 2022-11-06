import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from 'src/app/views/user-info/user-info.component';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    showUserPersonalData: boolean = true;

    constructor() { }

    ngOnInit(): void {
    }
}
