import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Category, CategoryMapping } from 'src/app/enums/category';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import { ADType } from 'src/app/enums/type';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-post-form',
    templateUrl: './add-post-form.component.html',
    styleUrls: ['./add-post-form.component.css'],
})
export class AddPostFormComponent implements OnInit {
    form!: FormGroup;
    selectedFiles?: FileList;
    selectedFileNames: string[] = [];
    previews: string[] = [];
    imageInfos?: Observable<any>;

    public categories = Object.values(Category);
    public CategoryMapping = CategoryMapping;

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private uploadService: FileUploadService,
        private postService: PostService,
        private accountService: AccountService,
        private _snackBar: MatSnackBar,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            category: ['', [Validators.required]],
            price: ['', [Validators.required]],
            location: ['', [Validators.required]],
            file: [''],
            fileSource: [null],
        });
    }

    get f() {
        return this.form.controls;
    }

    // on file select event
    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.patchValue({
                fileSource: file,
            });
        }
    }

    // on form submit function
    onSubmit() {
        const user = this.accountService.getLoggedInUser();
        if (!user) {
            this._snackBar.open('Eroare neasteptata', 'Eroare', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
            });
        }
        const postData = {
            title: this.form.get('title')?.value,
            description: this.form.get('description')?.value,
            category: this.form.get('category')?.value,
            price: this.form.get('price')?.value,
            photos: <any>[],
            userId: user.user.id,
            type: ADType.AD,
        };

        if (!this.selectedFiles || this.selectedFiles.length === 0) {
            this.createPost(postData);
            return;
        }

        this._snackBar.open('Incarcare imagini', 'Info', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
        this.uploadService.uploadImages(this.selectedFiles).subscribe(
            (response) => {
                const fileIds = response.map((item: { body: { imageId: any; }; }) => {return item.body.imageId})
                postData.photos = fileIds;
                this.createPost(postData);
            },
            (error) => {
                this._snackBar.open('Incarcare fisiere esuata', 'Eroare', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            },
        );
    }

    createPost(postData: any): void {
        this._snackBar.open('Creare Anunt', 'Info', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
        this.postService.createPost(postData).subscribe(
            {
                next: (result) => {
                    if (result instanceof HttpResponse) {
                        this._snackBar.open('Anuntul tau a fost creat', 'Succes', {
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                        });
                        const postId = result.body.id;
                        this.router.navigate(['item', postId],  {queryParams: {category: postData.category}});
                    }
                },
                error: (err) => {
                    this._snackBar.open('Eroare la crearea anuntului', 'Eroare', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                    });
                }
            }
        );
    }

    selectFiles(event: any): void {
        this.selectedFileNames = [];
        this.selectedFiles = event.target.files;

        this.previews = [];
        if (this.selectedFiles && this.selectedFiles[0]) {
            const numberOfFiles = this.selectedFiles.length;
            for (let i = 0; i < numberOfFiles; i++) {
                const reader = new FileReader();

                reader.onload = (e: any) => {
                    console.log(e.target.result);
                    this.previews.push(e.target.result);
                };

                reader.readAsDataURL(this.selectedFiles[i]);

                this.selectedFileNames.push(this.selectedFiles[i].name);
            }
        }
    }
}
