import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeManager } from './recipe-manager';

describe('RecipeManager', () => {
  let component: RecipeManager;
  let fixture: ComponentFixture<RecipeManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
