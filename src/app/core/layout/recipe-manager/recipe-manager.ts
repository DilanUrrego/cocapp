import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Para ngModel en template
import { CreateRecipe } from "../../../features/pages/create-recipe/create-recipe";
import { RecipeListComponent } from '../../../shared/components/recipe-list/recipe-list';
import { RecipeLocal } from '../../../shared/services/recipe';
import { Recipe } from '../../../shared/interfaces/recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-manager',
  templateUrl: './recipe-manager.html',
  styleUrls: ['./recipe-manager.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    CreateRecipe,
    RecipeListComponent
  ]
})
export class RecipeManager implements OnInit, OnDestroy {
  private recipeService = inject(RecipeLocal);

  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;

  searchText: string = '';
  selectedFilter: string = 'Todas';
  isDropdownOpen: boolean = false;
  showRecipeCreator = false;
  
  filters: string[] = [
    'Todas',
    'Desayuno',
    'Almuerzo',
    'Cena',
    'Postre',
    'Snack'
  ];

  private handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.filter-dropdown')) {
      this.isDropdownOpen = false;
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.loadRecipes();
    document.addEventListener('click', this.handleClickOutside);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside);
  }

  private loadRecipes(): void {
    this.recipes = this.recipeService.getRecipes();
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.recipes];

    if (this.searchText.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        recipe.ingredients.some(ing =>
          ing.name.toLowerCase().includes(this.searchText.toLowerCase())
        )
      );
    }

    if (this.selectedFilter !== 'Todas') {
      filtered = filtered.filter(recipe => recipe.mealTime === this.selectedFilter);
    }

    this.filteredRecipes = filtered;
  }

  onAddRecipe(): void {
    this.showRecipeCreator = true;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
    this.isDropdownOpen = false;
    this.applyFilters();
  }

  onRecipeCreated(recipe: Recipe): void {
    this.recipes = [...this.recipes, recipe];
    if (this.selectedRecipe) {
      this.recipeService.updateRecipe(recipe); 
      this.selectedRecipe = null;
    } else {
      this.recipeService.addRecipe(recipe);
    }

    this.loadRecipes();
    this.showRecipeCreator = false;
  }

  onEditRecipe(recipe: Recipe): void {
    this.selectedRecipe = { ...recipe };
    this.showRecipeCreator = true;
  }

  onDeleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id);
    this.loadRecipes();
  }
}
