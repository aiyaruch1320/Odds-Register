import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  title = 'register';
  hide_pass = true;
  hide_confirmPass = true;
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = fb.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        sex: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        tel: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]{10}'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.checkPasswords }
    );
  }

  buttonHidden: Boolean = true;
  buttonShow: Boolean = false;
  uid: String = '';
  async onSubmit() {
    if (this.registerForm.valid) {
      this.buttonShow = true;
      this.buttonHidden = false;
      console.log('Submitted');

      await this.userService
        .addUser(this.registerForm.value)
        .subscribe((data) => {
          this.uid = data.id;
          this.userService.saveUser(this.registerForm.value,this.uid);
          this.router.navigateByUrl('verify');
        });
    }
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  matcher = new MyErrorStateMatcher();
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(
      control?.parent?.invalid && control?.parent?.dirty
    );
    return invalidCtrl || invalidParent;
  }
}

// Check password match from https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6

// this.userService.addUser(this.registerForm.value).subscribe((data) => {
//   this.router.navigateByUrl('success');
