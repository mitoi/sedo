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
            `${environment.apiUrl}/ad`,
            post,
            {
                reportProgress: true,
                responseType: 'json',
            }
        );

        return this.http.request(req);
    }

    getPost(id: string): Observable<HttpEvent<any>>{
        const req = new HttpRequest(
            'GET',
            `${environment.apiUrl}/ad/${id}`,
            {
                reportProgress: true,
                responseType: 'json',
            }
        );

        return this.http.request(req);
    }

    deletePost(id: string): Observable<HttpEvent<any>>{
        const req = new HttpRequest(
            'DELETE',
            `${environment.apiUrl}/ad/${id}`,
            {
                reportProgress: true,
                responseType: 'json',
            }
        );

        return this.http.request(req);
    }

    listPosts(category: any){
        let url = `${environment.apiUrl}/ad/list`;
        if (category) {
            url += `?category=${category}`;
        }
        const req = new HttpRequest(
            'GET',
            url,
        );

        return this.http.request(req);
    }

    searchPosts(query: any){
        let url = `${environment.apiUrl}/ad/list`;
        if (query) {
            url += `?title=${query}`;
        }
        const req = new HttpRequest(
            'GET',
            url,
        );

        return this.http.request(req);
    }
}
