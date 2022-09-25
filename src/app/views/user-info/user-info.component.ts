import { Component, OnInit, ViewChild } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
    @ViewChild(MatAccordion)
    accordion!: MatAccordion;

    constructor() {}

    ngOnInit(): void {
    }

}
