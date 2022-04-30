import { Component, OnInit } from '@angular/core';
import {
  ValidationErrors,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { HelperService } from 'src/app/helper.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/services/interfaces';

@Component({
  selector: 'login-and-create-account',
  templateUrl: './login-and-create-account.component.html',
  styleUrls: ['./login-and-create-account.component.scss'],
})
export class LoginAndCreateAccountComponent implements OnInit {
  signIn!: FormGroup;
  signUp!: FormGroup;
  messageSignIn: string = '';
  messageSignUp: string = '';

  constructor(private helper: HelperService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signIn = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
          ),
        ],
      ],
    });
    this.signUp = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        rawPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
            ),
          ],
        ],
        passwordConfirm: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
            ),
          ],
        ],
      },
      { validators: this.checkPasswords }
    );
  }

  async signInSubmit() {
    if (this.signIn.valid) {
      let response = await this.postSignInAndOutForms(
        '/auth',
        this.signIn.value
      );
      if (response.ok) {
        let user = await response.json();
        this.helper.setCurrentUser(user);
      } else {
        this.messageSignIn = await response.text();
      }
    }
  }

  async signUpSubmit() {
    if (this.signUp.valid) {
      let dataToSent: any = JSON.parse(JSON.stringify(this.signUp.value));
      delete dataToSent['passwordConfirm'];
      let response = await this.postSignInAndOutForms('/user', dataToSent);
      if (response.ok) {
        let user: User = await response.json();
        this.helper.setCurrentUser(user);
      } else {
        this.messageSignUp = await response.text();
      }
    }
  }

  async postSignInAndOutForms(endpoint: string, data: any): Promise<Response> {
    return fetch(environment.URL + endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  checkPasswords: ValidatorFn = (
    signUp: AbstractControl
  ): ValidationErrors | null => {
    let password = signUp.get('rawPassword')?.value;
    let passwordConfirm = signUp.get('passwordConfirm')?.value;

    if (password === passwordConfirm) {
      return null;
    }
    signUp.get('passwordConfirm')?.setErrors({ notTheSame: true });
    return { notSame: true };
  };

  //? Getters for the sign-in form, used in the HTML template in [ngClass]
  get signInEmail() {
    return this.signIn.get('email');
  }
  get signInPassword() {
    return this.signIn.get('password');
  }

  //? Getters for the sign-up form, used in the HTML template in [ngClass]
  get signUpFirstName() {
    return this.signUp.get('firstName');
  }
  get signUpLastName() {
    return this.signUp.get('lastName');
  }
  get signUpEmail() {
    return this.signUp.get('email');
  }
  get signUpPassword() {
    return this.signUp.get('rawPassword');
  }
  get signUpPasswordConfirm() {
    return this.signUp.get('passwordConfirm');
  }
}
