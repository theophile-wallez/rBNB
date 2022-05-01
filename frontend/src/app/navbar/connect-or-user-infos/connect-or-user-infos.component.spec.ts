import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectOrUserInfosComponent } from './connect-or-user-infos.component';

describe('ConnectOrUserInfosComponent', () => {
  let component: ConnectOrUserInfosComponent;
  let fixture: ComponentFixture<ConnectOrUserInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectOrUserInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectOrUserInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
