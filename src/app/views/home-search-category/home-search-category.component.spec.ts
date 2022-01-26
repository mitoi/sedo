import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSearchCategoryComponent } from './home-search-category.component';

describe('HomeSearchCategoryComponent', () => {
  let component: HomeSearchCategoryComponent;
  let fixture: ComponentFixture<HomeSearchCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSearchCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSearchCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
