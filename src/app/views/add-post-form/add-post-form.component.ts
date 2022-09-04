import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Category, CategoryMapping } from 'src/app/enums/category';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent implements OnInit {
  form!: FormGroup;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;
  
  public categories = Object.values(Category);
  public CategoryMapping = CategoryMapping;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder,
    private uploadService: FileUploadService,
    private postService: PostService
  ) { }
  
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

    this.imageInfos = this.uploadService.getFiles();
  }

  get f() {
    return this.form.controls;
  }

   // on file select event
   onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
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

    this.postService.createPost(formData);
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
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
