import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TablesWatcherComponent} from './tables-watcher.component';

describe('TablesWatcherComponent', () => {
  let component: TablesWatcherComponent;
  let fixture: ComponentFixture<TablesWatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesWatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
