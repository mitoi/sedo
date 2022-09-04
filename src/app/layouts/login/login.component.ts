import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, first } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SedoService } from '../../services/sedo.service';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;

  loading = false;
  submitted = false;

  constructor(private breakpointObserver: BreakpointObserver, 
    private authService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private sedoService: SedoService, private _formBuilder: FormBuilder) { }
  cols$: Observable<number> = this.breakpointObserver
  .observe([Breakpoints.Small, Breakpoints.XSmall])
  .pipe(
    map((result) => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        return 1;
      } else if (result.breakpoints[Breakpoints.Small]) {
        return 1;
      } else {
        return 2;
      }
    }),
    shareReplay()
  );

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      usernameCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
    });
  }

  login(): void {
    const payload = {
      email: this.loginForm.controls['usernameCtrl'].value,
      password: this.loginForm.controls['passwordCtrl'].value,
    }

    this.submitted = true;
    this.loading = true;
    // reset alerts on submit

    this.authService.login(this.loginForm.controls['usernameCtrl'].value, this.loginForm.controls['passwordCtrl'].value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.loading = false;
                }
            });
  }

}
