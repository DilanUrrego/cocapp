import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSelectorModal } from './recipe-selector-modal';

describe('RecipeSelectorModal', () => {
  let component: RecipeSelectorModal;
  let fixture: ComponentFixture<RecipeSelectorModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeSelectorModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeSelectorModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
