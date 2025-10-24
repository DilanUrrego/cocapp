// src/app/shared/components/recipe-list/recipe-list.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Recipe, Ingredient } from '../../../shared/interfaces/recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] = [];
  @Output() editRecipe = new EventEmitter<Recipe>();
  @Output() deleteRecipe = new EventEmitter<string | number>();

  getMealTimeLabel(mealTime: Recipe['mealTime']): string {
    const labels: Record<Recipe['mealTime'], string> = {
      'Desayuno': 'Desayuno',
      'Almuerzo': 'Almuerzo',
      'Cena': 'Cena',
      'Postre': 'Postre',
      'Snack': 'Snack'
    };
    return labels[mealTime] || mealTime;
  }

  onEdit(recipe: Recipe): void {
    this.editRecipe.emit(recipe);
  }

  onDelete(id: string | number): void {
    if (confirm('¿Estás seguro de eliminar esta receta?')) {
      this.deleteRecipe.emit(id);
    }
  }

  getIngredientPreviewIndex(ingredient: Ingredient, recipe: Recipe): number {
    return recipe.ingredients.findIndex(i => i.name === ingredient.name);
  }
}