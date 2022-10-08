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
    private isRefreshingToken = false;
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): any {
        return this.userSubject.value;
    }

    login(email: any, password: any) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
            .pipe(map(user => {
                const expiresAt = moment().add(user.expiresIn, 'second');
            
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

                this.userSubject.next(user);
                return user;
            }));
    }

    refreshToken(refreshToken: any) {
        return this.http.post<any>(`${environment.apiUrl}/generateNewToken`, { refreshToken })
        .pipe(map(data => {
            let userData = this.userValue;
            if (data.accessToken && userData) {
                userData.user.token = data.accessToken;

                const expiresAt = moment().add(userData.user.expiresIn, 'second');
                localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
                localStorage.setItem('user', JSON.stringify(userData));

                this.userSubject.next(userData);

                return userData;
            }
            return false;
        }));
    }

    logout(navigateToLogin: boolean, navigateToHome: boolean = false) {
        // first try to get a new token using the refresh token
        const userData = this.userValue;
        if (userData && userData.user) {
            const refreshToken= userData.user.refreshToken;
            this.isRefreshingToken = true;
            this.refreshToken(refreshToken).subscribe({
                next: (data) => {
                    this.isRefreshingToken = false;
                    if (!data) {
                        this._logoutForReal(navigateToLogin, navigateToHome);
                        return;
                    }

                    return data;
                },
                error: (err) => {
                    this.isRefreshingToken = false;
                    console.log(err);
                    // remove user from local storage and set current user to null
                    this._logoutForReal(navigateToLogin, navigateToHome);
                    return false;
                },
            })
        } else {

        }
    }

    _logoutForReal(navigateToLogin:any, navigateToHome:any) {
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
        let isExpired = moment().isAfter(this.getExpiration());

        if (!user || isExpired && this.isRefreshingToken == false) {
            this.logout(false);
            return false;
        }
        return JSON.parse(user);
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at") || '';
        if (!expiration || expiration == '') {
            return moment().subtract(1);
        }
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    getUserInfo() {
        let loggedInUser = this.userValue;
        let userId = loggedInUser.user.id;

        return this.http.get<any>(`${environment.apiUrl}/user/${userId}`);
    }

    updateUserInfo(data: any) {
        let loggedInUser = this.userValue;
        let userId = loggedInUser.user.id;
        return this.http.put<any>(`${environment.apiUrl}/user/${userId}`, data);
    }

    getUserPosts() {
        let loggedInUser = this.userValue;
        let userId = loggedInUser.user.id;
        return this.http.get<any>(`${environment.apiUrl}/user/${userId}/posts`);
    }
 }
