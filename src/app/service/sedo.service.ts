import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class SedoService {

    url = 'http://localhost:3000/v1';

    constructor(private http: HttpClient) { }

    login(data: Object) {
        this.http.post(this.url + '/login', data).subscribe(data => {
            this.setSession(data);
        }, error => {
            return {error: error}
        })
    }
    
    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at") || '';
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }  

    register(data: Object) {
        this.http.post<User>(this.url + '/register', data).subscribe(data => {
            
        }, error => {
            return {error: error.error}
        });
    }

    private setSession(authResult: any) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }  
}
