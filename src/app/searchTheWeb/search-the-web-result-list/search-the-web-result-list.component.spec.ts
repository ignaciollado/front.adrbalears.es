import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTheWebResultListComponent } from './search-the-web-result-list.component';

describe('SearchTheWebResultListComponent', () => {
  let component: SearchTheWebResultListComponent;
  let fixture: ComponentFixture<SearchTheWebResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTheWebResultListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchTheWebResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
