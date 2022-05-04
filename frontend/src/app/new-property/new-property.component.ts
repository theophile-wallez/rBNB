import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Property } from 'src/services/interfaces';
import { HelperService } from '../services/helper.service';
import { WebService } from '../services/web.service';

@Component({
  selector: 'new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss'],
})
export class NewPropertyComponent implements OnInit {
  myForm!: FormGroup;
  devId: string = '5kigfXW11ZTZzTOXOEH3';
  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private webService: WebService
  ) {}

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

  createNewProperty() {
    let property: Property = this.myForm.value;
    let userId: string | undefined = this.helper.currentUser.id;
    if (userId) {
      this.webService.postPropertyByUserId(property, userId);
    }
  }
}
