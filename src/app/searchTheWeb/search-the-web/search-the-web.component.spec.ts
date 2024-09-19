import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTheWebComponent } from './search-the-web.component';

describe('SearchTheWebComponent', () => {
  let component: SearchTheWebComponent;
  let fixture: ComponentFixture<SearchTheWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTheWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchTheWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
