import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Category, CategoryMapping } from 'src/app/enums/category';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', [Validators.required]],
            description: [''],
            category: [''],
            price: [''],
            location: [''],
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
        const formData = new FormData();
        formData.append('file', this.form.get('fileSource')?.value);
        formData.append('title', this.form.get('title')?.value);
        formData.append('description', this.form.get('description')?.value);
        formData.append('category', this.form.get('category')?.value);
        formData.append('price', this.form.get('price')?.value);

        const postData = {
            title: this.form.get('title')?.value,
            description: this.form.get('description')?.value,
            category: this.form.get('category')?.value,
            price: this.form.get('price')?.value,
        };

        this.postService.createPost(postData).subscribe(
            (postId: any) => {
                if (this.selectedFiles && this.selectedFiles.length > 0){
                    for (let index = 0; index < this.selectedFiles.length; index++) {
                        let file = this.selectedFiles.item(index);

                        this.uploadService.upload(file, postId)
                    }
                }
            },
            (error) => {
                this._snackBar.open('Incarcare fisiere esuata', 'Eroare', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            },
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
