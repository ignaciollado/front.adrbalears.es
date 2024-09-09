import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DissenyFormComponent } from './disseny-form.component';

describe('DissenyFormComponent', () => {
  let component: DissenyFormComponent;
  let fixture: ComponentFixture<DissenyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DissenyFormComponent]
    });
    fixture = TestBed.createComponent(DissenyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
