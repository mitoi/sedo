import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import { PostService } from 'src/app/services/post.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-user-posts',
    templateUrl: './user-posts.component.html',
    styleUrls: ['./user-posts.component.css'],
})
export class UserPostsComponent implements OnInit {
    constructor(
        private accountService: AccountService,
        private postService: PostService,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    displayedColumns: string[] = [
        'title',
        'description',
        'category',
        'price',
        'actions',
    ];
    dataSource: any = [];

    ngOnInit(): void {
        this.retrieveUserPosts();
    }

    retrieveUserPosts(): void {
        this.accountService.getUserPosts().subscribe({
            next: (data) => {
                if (data && data.error == false && data.records) {
                    this.dataSource = data.records;
                }
            },
            error: (err) => {
                console.log(err);
                this._snackBar.open('Eroare anunturi', 'Eroare', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            },
        });
    }

    deletePost(id: string): void {
        const message = `Esti sigur ca vrei sa stergi anunutul?`;

        const dialogData = new ConfirmDialogModel('Stergere anunt', message);

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData,
        });

        dialogRef.afterClosed().subscribe((dialogResult) => {
            if (dialogResult) {
                this.postService.deletePost(id).subscribe({
                    next: (data) => {
                        this._snackBar.open('Anunt sters', 'Succes', {
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                        });
                        this.dataSource = this.dataSource.filter((item: { _id: string; }) => {return item._id !== id});
                    },
                    error: (err) => {
                        this._snackBar.open('Eroare', 'Eroare', {
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                        });
                    },
                });
            }
        });
    }
}
