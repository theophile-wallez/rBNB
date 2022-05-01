import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectAdvertismentComponent } from './connect-advertisment.component';

describe('ConnectAdvertismentComponent', () => {
  let component: ConnectAdvertismentComponent;
  let fixture: ComponentFixture<ConnectAdvertismentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectAdvertismentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectAdvertismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
