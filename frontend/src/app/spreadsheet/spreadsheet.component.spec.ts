import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetComponent } from './spreadsheet.component';

describe('SpreadsheetComponent', () => {
  let component: SpreadsheetComponent;
  let fixture: ComponentFixture<SpreadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpreadsheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpreadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
