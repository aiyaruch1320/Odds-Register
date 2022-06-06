import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    )
  }

  hide_pass = true;

  loginForm : FormGroup = new FormGroup({})


  ngOnInit(): void {
  }

}
