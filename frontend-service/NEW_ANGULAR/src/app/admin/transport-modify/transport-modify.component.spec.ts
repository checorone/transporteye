import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransportModifyComponent} from './transport-modify.component';

describe('TransportModifyComponent', () => {
  let component: TransportModifyComponent;
  let fixture: ComponentFixture<TransportModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
