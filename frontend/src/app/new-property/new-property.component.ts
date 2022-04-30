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
  selector: 'new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss'],
})
export class NewPropertyComponent implements OnInit {
  myForm!: FormGroup;
  devId: string = '5kigfXW11ZTZzTOXOEH3';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const location = this.fb.group({
      country: '',
      zipCode: '',
      number: '',
      street: '',
    });

    this.myForm = this.fb.group({
      housingType: '',
      location: location,
      description: '',
      bedAmount: '',
      squareFootage: '',
      pricePerDay: '',
    });

    this.myForm.valueChanges.subscribe(console.log);
  }

  async postProperty() {
    let response = await fetch(
      environment.URL + '/property/by-user-id?id=' + this.devId,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.myForm.value),
      }
    );
  }
}
