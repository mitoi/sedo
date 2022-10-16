import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';
import { JobPosting } from '../model/JobPosting';
@Injectable({
    providedIn: 'root',
})

export class BidService {
    constructor(private http: HttpClient) {}

    createBid(bid: any): Observable<HttpEvent<any>>{
        const req = new HttpRequest(
            'POST',
            `${environment.apiUrl}/bid`,
            bid,
            {
                reportProgress: true,
                responseType: 'json',
            }
        );

        return this.http.request(req);
    }

    getUserBids(userId: string) {
        let url = `${environment.apiUrl}/user/${userId}/bids`;
        return this.http.get<any>(url);
    }

    getPostBids(postId: string) {
        let url = `${environment.apiUrl}/ad/${postId}/bids`;
        return this.http.get<any>(url);
    }
}
