import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../services/helper/helper.service';
import { User } from '../services/interfaces/interfaces';
import { WebService } from '../services/web/web.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    public helper: HelperService,
    private fb: FormBuilder,
    private webService: WebService
  ) {}

  userEditForm!: FormGroup;
  user: User = {};
  ngOnInit(): void {
    this.helper.userObservable.subscribe((user: User) => {
      if (user.id) {
        this.user = user;
        this.initUserForm();
      } else {
        this.helper.changeRoute('/listing');
      }
    });
  }

  initUserForm(): void {
    this.userEditForm = this.fb.group({
      firstName: [
        this.user.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [
        this.user.lastName,
        [Validators.required, Validators.minLength(2)],
      ],
      email: [this.user.email, [Validators.required, Validators.email]],
      // password: '',
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
          ),
        ],
      ],
    });
  }

  async applySubmit() {
    let userFormCopy = this.userEditForm;
    let passwordCopy = userFormCopy.value.password;
    delete userFormCopy.value.password;

    let userId: string | undefined = this.user.id!;

    if (!this.user.id) return;

    let response = await this.webService.updateUser(userFormCopy.value, userId);
    if (response.ok) {
      this.helper.newNotification(
        'Your profile has been successfully updated!'
      );
    } else {
      this.helper.newError('An error has occured');
    }
  }
}
