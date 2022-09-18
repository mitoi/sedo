import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';
import { JobPosting } from '../model/JobPosting';
@Injectable({
    providedIn: 'root',
})

export class PostService {
    constructor(private http: HttpClient) {}

    createPost(post: any): Observable<HttpEvent<any>>{
        const req = new HttpRequest(
            'POST',
            `${environment.apiUrl}/v1/post`,
            post,
            {
                reportProgress: true,
                responseType: 'json',
            }
        );

        return this.http.request(req);;
    }
}
