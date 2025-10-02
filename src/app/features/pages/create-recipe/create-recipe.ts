import { Component, EventEmitter, Output, inject } from '@angular/core';
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
export class CreateRecipe {
  @Output() closePopup = new EventEmitter<void>();

  router = inject(Router);
  recipeLocal=inject(RecipeLocal);
  fb = inject(FormBuilder);

  recipeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    mealTime: ['', Validators.required],
    prepTime: [0, [Validators.required, Validators.min(1)]], // Cambiado a number
    servings: [0, [Validators.required, Validators.min(1)]], // Cambiado a number
    instructions: [''],
    ingredients: this.fb.array([
      this.createIngredient()
    ])
  });

  addRecipe() {
    if (!this.recipeForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Faltan campos por completar o son incorrectos.',
      });
      return;
    }

  const recipe = this.recipeForm.value as Recipe;
  
   this.recipeLocal.addRecipe(recipe);
  
  Swal.fire({
    icon: 'success',
    title: 'Receta creada',
    text: 'La receta se ha guardado correctamente.',
    timer: 1500,
    showConfirmButton: false
  }).then(() => {
    this.router.navigate(['/recipes']);
  });
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
    this.closePopup.emit();
  }
}