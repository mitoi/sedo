import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';
import { JobPosting } from '../model/JobPosting';
@Injectable({
    providedIn: 'root',
})

export class PostService {
    private baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    createPost(post: any) {}
}
