import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { forkJoin } from 'rxjs';


import { environment } from '../../environments/environment.prod';
@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    constructor(private http: HttpClient) {}

    uploadImages(files: any): Observable<any> {
        var tasks = [];

        if (files && files.length > 0){
            for (let index = 0; index < files.length; index++) {
                let file = files.item(index);

                tasks.push(this.upload(file));
            }
        }
        return forkJoin(tasks);
    }

    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('image', file);

        const req = new HttpRequest(
            'POST',
            `${environment.apiUrl}/upload/photo`,
            formData,
            {
                reportProgress: true,
                responseType: 'json',
            },
        );

        return this.http.request(req);
    }
}
