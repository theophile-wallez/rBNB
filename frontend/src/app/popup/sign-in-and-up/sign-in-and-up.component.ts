import { Component, OnInit } from '@angular/core';
import {
  ValidationErrors,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';
import { WebService } from 'src/app/services/web/web.service';
import { User } from 'src/app/services/interfaces/interfaces';

@Component({
  selector: 'sign-in-and-up',
  templateUrl: './sign-in-and-up.component.html',
  styleUrls: ['./sign-in-and-up.component.scss'],
})
export class SignInAndUpComponent implements OnInit {
  signIn!: FormGroup;
  signUp!: FormGroup;
  messageSignIn: string = '';
  messageSignUp: string = '';

  constructor(
    private helper: HelperService,
    private fb: FormBuilder,
    private webService: WebService
  ) {}

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
      let response = await this.webService.postSignInForms(this.signIn.value);
      if (response.ok) {
        let user = await response.json();
        this.helper.setCurrentUser(user);
        this.helper.closePopup();

        this.helper.newNotification(
          'Hello ' + user.firstName + ", you've successfully logged in!"
        );
      } else {
        this.helper.newError(await response.text());
      }
    }
  }

  async signUpSubmit() {
    if (this.signUp.valid) {
      let dataToSent: any = JSON.parse(JSON.stringify(this.signUp.value));
      delete dataToSent['passwordConfirm'];
      let response = await this.webService.postSignOutForms(dataToSent);
      if (response.ok) {
        let user: User = await response.json();
        this.helper.setCurrentUser(user);
        this.helper.closePopup();
        this.helper.newNotification(
          'Hello ' +
            user.firstName +
            ", you've successfully created your account!"
        );
      } else {
        this.helper.newError(await response.text());
      }
    }
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
