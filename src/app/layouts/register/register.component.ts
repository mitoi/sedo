import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { SedoService } from 'src/app/services/sedo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  userType!: string;
  hidepassword = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl();
  filteredSkills!: Observable<string[]>;
  allSkills: string[] = ['Zidarie', 'Electronica', 'Curatenie', 'Java', 'Tamplarie', 'Peisagistica',];
  skills: string[] = [];

  @ViewChild('skillsInput')
  skillsInput!: ElementRef<HTMLInputElement>;

  constructor(private breakpointObserver: BreakpointObserver, private _formBuilder: FormBuilder, private sedoService: SedoService) { 
    this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice())),
    );
  }



  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillsCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.skills.indexOf(fruit);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillsInput.nativeElement.value = '';
    this.skillsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }

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
    this.firstFormGroup = this._formBuilder.group({
      userTypeCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.email],
      passwordCtrl: ['', Validators.required],
      telephoneCtrl: ['', [Validators.required, Validators.pattern("[0-9 ]{10}"),]],
      skillsCtrl: ['']
    });
  }


  updateUserType(): void {
    this.userType = this.firstFormGroup.controls['userTypeCtrl'].value;
  }

  createAccount(): void {
    const payload = {
      type: this.userType,
      firstName: this.secondFormGroup.controls['firstNameCtrl'].value,
      lastName: this.secondFormGroup.controls['lastNameCtrl'].value,
      email: this.secondFormGroup.controls['emailCtrl'].value,
      password: this.secondFormGroup.controls['passwordCtrl'].value,
      phone: this.secondFormGroup.controls['telephoneCtrl'].value,
      skills: this.secondFormGroup.controls['skillsCtrl'].value,
      rating: 0,
    };

    this.sedoService.register(payload);
  }
}
