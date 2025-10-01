import { Component, OnInit } from '@angular/core';
import { CreateRecipe } from "../../../features/pages/create-recipe/create-recipe";

@Component({
  selector: 'app-recipe-manager',
  templateUrl: './recipe-manager.html',
  styleUrls: ['./recipe-manager.css'],
  imports: [CreateRecipe]
})

export class RecipeManager implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown')) {
        this.isDropdownOpen = false;
      }
    });
  }

  onAddRecipe(): void {
    console.log('Añadir nueva receta');
    // Aquí implementarías la lógica para abrir un modal o navegar a un formulario
  }

  onSearchChange(): void {
    console.log('Buscando:', this.searchText);
    // Aquí implementarías la lógica de búsqueda
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
    this.isDropdownOpen = false;
    console.log('Filtro seleccionado:', filter);
    // Aquí implementarías la lógica de filtrado
  }

  ngOnDestroy(): void {
    // Limpiar event listeners
    document.removeEventListener('click', () => {});
  }
}