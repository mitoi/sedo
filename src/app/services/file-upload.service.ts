import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';
@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    constructor(private http: HttpClient) {}

    upload(file: File, postId: string): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);
        formData.append('postId', postId);

        const req = new HttpRequest(
            'POST',
            `${environment.apiUrl}/v1/upload/photo`,
            formData,
            {
                reportProgress: true,
                responseType: 'json',
            }
        );

        return this.http.request(req);
    }
}
