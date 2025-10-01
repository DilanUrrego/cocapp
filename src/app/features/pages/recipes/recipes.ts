import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from "../../../core/layout/header/header";
import { RecipeManager } from "../../../core/layout/recipe-manager/recipe-manager";

@Component({
  selector: 'app-recipes',
  imports: [RouterModule, Header, RecipeManager],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css'
})
export class Recipes {

}
