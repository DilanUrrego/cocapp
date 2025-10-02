import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeLocal{

  private storageKey = 'recipes';

  getRecipes(): Recipe[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
  addRecipe(recipe: Recipe): void {
    const recipes = this.getRecipes();
    recipes.push(recipe);
    localStorage.setItem(this.storageKey, JSON.stringify(recipes));
  }

  deleteRecipe(index: number): void {
    const recipes = this.getRecipes();
    recipes.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(recipes));
  }

  clearRecipes(): void {
    localStorage.removeItem(this.storageKey);
  }
}
