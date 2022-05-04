import { Country } from '@angular-material-extensions/select-country';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Property } from 'src/app/services/interfaces/interfaces';
import { HelperService } from '../../services/helper.service';
import { WebService } from '../../services/web.service';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss'],
})
export class NewPropertyComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private webService: WebService
  ) {}

  ngOnInit() {
    const location = this.fb.group({
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      number: ['', [Validators.required]],
      streetType: ['Street', [Validators.required]],
      street: ['', [Validators.required]],
    });

    this.myForm = this.fb.group({
      housingType: ['house', [Validators.required]],
      location: location,
      description: '',
      bedAmount: ['', [Validators.required]],
      squareFootage: ['', [Validators.required]],
      pricePerDay: ['', [Validators.required]],
    });

    // this.myForm.valueChanges.subscribe(console.log);
    this.myForm.valueChanges.subscribe(() => {
      console.log(this.myForm.get('location')?.get('zipCode'));
    });
  }

  cleanPropertyBeforeSubmit(property: any): any {
    property.location['country'] = property.location?.country['name'];
    property.location['street'] =
      property.location['street'] + ' ' + property.location['streetType'];
    delete property.location['streetType'];
    property['isListed'] = true;
    return property;
  }

  createNewProperty() {
    let property: any = JSON.parse(JSON.stringify(this.myForm.value));
    property = this.cleanPropertyBeforeSubmit(property);
    console.log(property);
    let userId: string | undefined = this.helper.currentUser.id;
    if (userId) {
      this.webService.postPropertyByUserId(property, userId);
    }
  }

  get zipCode() {
    return this.myForm.get('location')?.get('zipCode');
  }
  get number() {
    return this.myForm.get('location')?.get('number');
  }
  get street() {
    return this.myForm.get('location')?.get('street');
  }
  get streetType() {
    return this.myForm.get('location')?.get('streetType');
  }
  get bedAmount() {
    return this.myForm.get('bedAmount');
  }
  get squareFootage() {
    return this.myForm.get('squareFootage');
  }
  get pricePerDay() {
    return this.myForm?.get('pricePerDay');
  }
}
