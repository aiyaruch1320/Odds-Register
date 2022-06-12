import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../register/register.component';
import { Pin } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  pinForm: FormGroup = new FormGroup({});

  uid!: String;
  email?: String;
  pin?: Pin;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.pinForm = fb.group({
      pin: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{6}'),
      ]),
      confirmPin: new FormControl(),
      uid: new FormControl(),
    },
    { validators: this.checkPin });
  }

  ngOnInit(): void {
    this.email = this.userService.CurrentUser?.email;
    this.uid = this.userService.CurrentUid;
    this.pinForm.get('uid')?.setValue(this.uid);
    this.userService.getPin(this.uid).subscribe((data) => (this.pin = data));
    console.log('pin: ' + this.pin?.pin);
    console.log('email: ' + this.email);
    console.log('uid: ' + this.uid);
  }

  buttonHidden: Boolean = false;
  async onSendPin() {
    console.log('onSendPin Submitted');
    if (this.pinForm.valid) {
      console.log('Check Pin Running ..');
      this.buttonHidden = true;
      await this.userService.sendPin(this.pin!.id).subscribe(
        () => {
          this.router.navigateByUrl('success');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  checkPin: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let userKeyPin = group.get('pin')?.value;
    let confirmPin = this.pin?.pin;
    return userKeyPin == confirmPin ? null : { notSame: true };
  };

  matcher = new MyErrorStateMatcher();
}
