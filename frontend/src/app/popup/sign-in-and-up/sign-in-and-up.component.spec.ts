import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInAndUpComponent } from './sign-in-and-up.component';

describe('LoginAndCreateAccountComponent', () => {
  let component: SignInAndUpComponent;
  let fixture: ComponentFixture<SignInAndUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInAndUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInAndUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
