import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportFakeRouteComponent } from './transport-fake-route.component';

describe('TransportFakeRouteComponent', () => {
  let component: TransportFakeRouteComponent;
  let fixture: ComponentFixture<TransportFakeRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportFakeRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportFakeRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
