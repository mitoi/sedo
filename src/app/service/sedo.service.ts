import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SedoService {

    url = 'http://localhost:3000/v1';

    constructor(private http: HttpClient) { }

    register(data: Object) {
        this.http.post<User>(this.url + '/register', data).subscribe(data => {
            
        }, error => {
            return {error: error.error}
        });
    }
}