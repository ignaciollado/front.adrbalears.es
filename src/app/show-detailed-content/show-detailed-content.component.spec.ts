import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailedContentComponent } from './show-detailed-content.component';

describe('ShowDetailedContentComponent', () => {
  let component: ShowDetailedContentComponent;
  let fixture: ComponentFixture<ShowDetailedContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDetailedContentComponent]
    });
    fixture = TestBed.createComponent(ShowDetailedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
