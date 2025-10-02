import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { Header } from "../../../core/layout/header/header";
import { RecipeManager } from "../../../core/layout/recipe-manager/recipe-manager";
import { inject, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { RecipeLocal } from '../../../shared/services/recipe';
import { Recipe } from '../../../shared/interfaces/recipe';

@Component({
  selector: 'app-recipes',
  imports: [RouterModule, Header, RecipeManager],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css'
})
export class Recipes {

  private authService = inject(Auth);
  recipeService = inject(RecipeLocal);
  router = inject(Router);

  isLogged = this.authService.isLogged;
  recipes: Recipe[] = [];

  constructor() {
    if (!this.isLogged()) {
      this.router.navigate(['home'], { queryParams: { authError: true } });
    } else {
      this.recipes = this.recipeService.getRecipes();
    }
  }


}

  

  

  

