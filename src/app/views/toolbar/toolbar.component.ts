import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClickLogin() {
    console.log('login');
  }

  onClickRegister() {
    console.log('register');
  }

  onClickClient() {
    console.log('client');
  }

  onClickSupplier() {
    console.log('supplier');
  }

  onClickONG() {
    console.log('ong');
  }
}
