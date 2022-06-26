import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SedoService } from 'src/app/service/sedo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;

  constructor(private breakpointObserver: BreakpointObserver, private sedoService: SedoService, private _formBuilder: FormBuilder) { }
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
    this.sedoService.login(payload);
  }

}
