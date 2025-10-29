import { Component, EventEmitter, Output, Input, inject, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Recipe } from '../../../shared/interfaces/recipe';
import { RecipeLocal } from '../../../shared/services/recipe';

@Component({
  selector: 'app-create-recipe',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-recipe.html',
  styleUrls: ['./create-recipe.css']
})
export class CreateRecipe implements OnChanges {
  @Input() recipeToEdit: Recipe | null = null;
  @Output() recipeCreated = new EventEmitter<Recipe>();
  @Output() recipeUpdated = new EventEmitter<Recipe>(); 
  @Output() closePopup = new EventEmitter<void>();

  router = inject(Router);
  recipeLocal = inject(RecipeLocal);
  fb = inject(FormBuilder);

  isEditing = false;

  recipeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    mealTime: ['', Validators.required],
    prepTime: [0, [Validators.required, Validators.min(1)]],
    servings: [0, [Validators.required, Validators.min(1)]],
    instructions: [''],
    ingredients: this.fb.array([
      this.createIngredient()
    ])
  });

saveRecipe() {
  if (!this.recipeForm.valid) {
    Swal.fire({
      icon: 'error',
      title: 'Formulario inválido',
      text: 'Faltan campos por completar o son incorrectos.',
    });
    return;
  }

  const recipe = this.recipeForm.value as Recipe;
  
  if (this.isEditing && this.recipeToEdit) {
    const updatedRecipe = { ...this.recipeToEdit, ...recipe };
    this.recipeUpdated.emit(updatedRecipe);
    
    Swal.fire({
      icon: 'success',
      title: 'Receta actualizada',
      text: 'La receta se ha actualizado correctamente.',
      timer: 1200,
      showConfirmButton: false
    }).then(() => {
      this.close();
    });
  } else {
    this.recipeCreated.emit(recipe);
    
    Swal.fire({
      icon: 'success',
      title: 'Receta creada',
      text: 'La receta se ha guardado correctamente.',
      timer: 1200,
      showConfirmButton: false
    }).then(() => {
      this.close();
    });
  }
}

  private createIngredient() {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  onCancel() {
    this.closePopup.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  close() {
    this.recipeForm.reset();
    this.ingredients.clear();
    this.addIngredient(); 
    this.isEditing = false;
    this.recipeToEdit = null;
    this.closePopup.emit();
  }

  ngOnChanges() {
    if (this.recipeToEdit) {
      this.isEditing = true;
      this.loadRecipeData();
    } else {
      this.isEditing = false;
    }
  }

  private loadRecipeData() {
    if (!this.recipeToEdit) return;

    this.recipeForm.patchValue({
      name: this.recipeToEdit.name,
      mealTime: this.recipeToEdit.mealTime,
      prepTime: this.recipeToEdit.prepTime,
      servings: this.recipeToEdit.servings,
      instructions: this.recipeToEdit.instructions
    });

    this.ingredients.clear();
    this.recipeToEdit.ingredients.forEach(ing => {
      this.ingredients.push(this.fb.group({
        name: [ing.name, Validators.required],
        quantity: [ing.quantity, Validators.required],
        unit: [ing.unit, Validators.required],
        type: [ing.type, Validators.required]
      }));
    });

    if (this.ingredients.length === 0) {
      this.addIngredient();
    }
  }
}