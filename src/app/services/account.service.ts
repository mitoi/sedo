import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { User } from '../model/User';
import * as moment from 'moment';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: any, password: any) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
            .pipe(map(user => {
                const expiresAt = moment().add(user.expiresIn,'second');
            
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

                this.userSubject.next(user);
                return user;
            }));
    }

    logout(navigateToLogin: boolean, navigateToHome: boolean = false) {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        localStorage.removeItem("expires_at");
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.userSubject.next(null!);
        if (navigateToLogin) {
            this.router.navigate(['/login']);
        }
        if (navigateToHome) {
            this.router.navigate(['/']);
        }
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/register`, user);
    }

    getLoggedInUser() {
        let user = localStorage.getItem('user');
        let isExpired = moment().isBefore(this.getExpiration());
        if (!user || isExpired) {
            this.logout(false);
            return false;
        }
        return JSON.parse(user);
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at") || '';
        if (!expiration || expiration == '') {
            return moment().add(1);
        }
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    getUserInfo() {
        let loggedInUser = this.getLoggedInUser();
        let userId = loggedInUser.user.id;

        return this.http.get<any>(`${environment.apiUrl}/user/${userId}`);
    }

    updateUserInfo(data: any) {
        let loggedInUser = this.getLoggedInUser();
        let userId = loggedInUser.user.id;
        return this.http.put<any>(`${environment.apiUrl}/user/${userId}`, data);
    }

    getUserPosts() {
        let loggedInUser = this.getLoggedInUser();
        let userId = loggedInUser.user.id;
        return this.http.get<any>(`${environment.apiUrl}/user/${userId}/posts`);
    }
 }
