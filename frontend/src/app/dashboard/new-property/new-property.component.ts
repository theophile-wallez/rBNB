import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Property } from 'src/app/services/interfaces/interfaces';
import { HelperService } from '../../services/helper.service';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss'],
})
export class NewPropertyComponent implements OnInit {
  myForm!: FormGroup;
  title = 'Rent out your property';
  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private webService: WebService,
    public dashboardService: DashboardService
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
    this.dashboardService.selectedPropertyBS.subscribe((property: Property) => {
      if (property.id) {
        this.title = 'Edit your property';
      }
      this.myForm.controls['bedAmount'].setValue(property.bedAmount ?? '');
      this.myForm.controls['bedAmount'].setValue(property.bedAmount ?? '');
      this.myForm
        ?.get('location')
        ?.get('number')
        ?.setValue(property.location?.number ?? '');
    });
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

  cleanPropertyBeforeSubmit(property: any): any {
    property.location['country'] = property.location?.country['name'];
    property.location['street'] =
      property.location['street'] + ' ' + property.location['streetType'];
    delete property.location['streetType'];
    property['isListed'] = true;
    return property;
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
