import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Property } from 'src/app/services/interfaces/interfaces';
import { HelperService } from '../../services/helper.service';
import { WebService } from '../../services/web.service';

interface HousingType {
  name: string;
  value: string;
}
@Component({
  selector: 'new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss'],
})
export class NewPropertyComponent implements OnInit {
  myForm!: FormGroup;
  isEditMode: Boolean = false;
  test: number = 2;
  title = 'Add a new property';
  buttonTitle = 'Submit your property';
  countries: any = {};
  cities: any = {};
  housingTypes: HousingType[] = [
    {
      name: 'Flat',
      value: 'flat',
    },
    {
      name: 'House',
      value: 'house',
    },
  ];
  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private webService: WebService,
    public dashboardService: DashboardService
  ) {}
  ngOnInit() {
    this.initDefaultForm();

    this.dashboardService.selectedPropertyBS.subscribe((property: Property) => {
      if (property.id) {
        this.editPropertyInit(property);
      }
    });
    //! For dev only, to remove
    this.myForm.valueChanges.subscribe(console.log);
  }

  initDefaultForm(): void {
    const location = this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      number: [null, [Validators.required]],
      streetType: ['Street', [Validators.required]],
      street: ['', [Validators.required]],
    });
    this.myForm = this.fb.group({
      housingType: ['', [Validators.required]],
      location: location,
      description: '',
      bedAmount: null,
      squareFootage: [null, [Validators.required]],
      pricePerDay: [null, [Validators.required]],
      services: [null, [Validators.required]],
      constraints: [null, [Validators.required]],
    });
  }

  editPropertyInit(property: Property): void {
    if (property.id) {
      this.isEditMode = true;
      this.myForm
        ?.get('location')
        ?.get('number')
        ?.setValue(property.location?.number ?? '');
      this.myForm
        ?.get('location')
        ?.get('country')
        ?.setValue(property.location?.country ?? '');
      this.myForm
        ?.get('location')
        ?.get('city')
        ?.setValue(property.location?.city ?? '');
      this.myForm
        ?.get('location')
        ?.get('number')
        ?.setValue(property.location?.number ?? '');
      this.myForm
        ?.get('location')
        ?.get('street')
        ?.setValue(
          property.location?.street.substring(
            0,
            property.location?.street.lastIndexOf(' ')
          ) ?? ''
        );
      this.myForm
        ?.get('location')
        ?.get('streetType')
        ?.setValue(property.location?.street.split(' ').pop() ?? '');
      this.myForm.controls['housingType'].setValue(property.housingType ?? '');
      this.myForm.controls['bedAmount'].setValue(property.bedAmount ?? '');
      this.myForm.controls['squareFootage'].setValue(
        property.squareFootage ?? ''
      );
      this.myForm.controls['pricePerDay'].setValue(property.pricePerDay ?? '');
      this.myForm.controls['services'].setValue(property.services ?? '');
      this.myForm.controls['constraints'].setValue(property.constraints ?? '');
      this.myForm.controls['description'].setValue(property.description ?? '');
    }
  }

  async createNewProperty() {
    let property: any = JSON.parse(JSON.stringify(this.myForm.value));
    property = this.cleanPropertyBeforeSubmit(property);
    let userId: string | undefined = this.helper.currentUser.id;

    if (!userId) return;

    let response = await this.webService.postPropertyByUserId(property, userId);
    if (response.ok) {
      this.helper.newNotification('Your property has been added!');
      //TODO clear form
      this.dashboardService.refreshPropertyList();
      this.dashboardService.scrollToId('propertyList');
      this.initDefaultForm();
    } else {
      this.helper.newError(
        'There was a problem when trying to add your property.'
      );
    }
  }

  cleanPropertyBeforeSubmit(property: any): any {
    // property.location['country'] = property.location?.country['name'];
    property.location['street'] =
      property.location['street'] + ' ' + property.location['streetType'];
    delete property.location['streetType'];
    property['isListed'] = true;
    return property;
  }

  async getCountries(event: any) {
    this.countries = await this.webService.getCountries(event.query);
  }

  async getCities(event: any) {
    let citiesKeep = JSON.parse(JSON.stringify(this.cities));
    this.cities = (await this.webService.getCities(event.query)) ?? citiesKeep;
  }

  get country() {
    return this.myForm.get('location')?.get('country');
  }
  get city() {
    return this.myForm.get('location')?.get('city');
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
