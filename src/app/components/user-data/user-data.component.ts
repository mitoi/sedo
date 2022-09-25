import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-user-data',
    templateUrl: './user-data.component.html',
    styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
    constructor(
        private accountService: AccountService,
        private _snackBar: MatSnackBar,
        private fb: FormBuilder,
    ) {}
    form!: FormGroup;
    userInfo!: any;
    ngOnInit(): void {
        this.form = this.fb.group({
            firstName: [''],
            lastName: [''],
            phone: [''],
        });
        this.retrieveUserInfo();
    }

    retrieveUserInfo(): void {
        this.accountService.getUserInfo().subscribe({
            next: (data) => {
                if (data && data.error == false && data.user) {
                    this.form.controls['firstName'].setValue(data.user.firstName);
                    this.form.controls['lastName'].setValue(data.user.lastName);
                    this.form.controls['phone'].setValue(data.user.phone);
                } else {
                    this._snackBar.open('Eroare', 'Eroare', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                    });
                }
            },
            error: (err) => {
                console.log(err);
                this._snackBar.open('Eroare', 'Eroare', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            },
        });
    }

    saveUserInfo(): void {
        this.accountService.updateUserInfo(this.form.value).subscribe({
            next: ()=>{
                this._snackBar.open('Informatiile tale au fost actualizate', 'Succes', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            },
            error: (err) => {
                this._snackBar.open('Eroare', 'Eroare', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            }
        });
    }
}
