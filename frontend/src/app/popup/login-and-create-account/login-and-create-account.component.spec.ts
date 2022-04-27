import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAndCreateAccountComponent } from './login-and-create-account.component';

describe('LoginAndCreateAccountComponent', () => {
  let component: LoginAndCreateAccountComponent;
  let fixture: ComponentFixture<LoginAndCreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAndCreateAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAndCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
