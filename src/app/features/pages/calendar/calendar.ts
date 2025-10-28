import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from "../../../core/layout/header/header";
import { RecipeSelectorModal } from '../../../recipe-selector-modal/recipe-selector-modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, Header],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class Calendar {
  weekDays = [
    { name: 'Lunes', date: 'Aug 18' },
    { name: 'Martes', date: 'Aug 19' },
    { name: 'Miércoles', date: 'Aug 20' },
    { name: 'Jueves', date: 'Aug 21' },
    { name: 'Viernes', date: 'Aug 22' },
  ];

  meals = ['Desayuno', 'Almuerzo', 'Cena'];

  weekData: { [key: string]: any[] } = {
    'Lunes': [
      { meal: 'Desayuno', name: 'Sandwich', ingredients: 3, time: 20 },
      { meal: 'Almuerzo', name: 'Lasagna', ingredients: 6, time: 60 },
      { meal: 'Cena', name: 'Chicken Wrap', ingredients: 2, time: 15 },
    ],
    'Martes': [
      { meal: 'Desayuno', name: 'Sandwich', ingredients: 3, time: 20 },
      { meal: 'Almuerzo', name: 'Lasagna', ingredients: 6, time: 60 },
      { meal: 'Cena', name: 'Chicken Wrap', ingredients: 2, time: 15 },
    ],
    'Miércoles': [],
    'Jueves': [],
    'Viernes': []
  };

  constructor(private dialog: MatDialog) {}

  getMealItems(dayName: string, mealType: string): any[] {
    return this.weekData[dayName]?.filter(item => item.meal === mealType) || [];
  }

  openRecipeSelector(dayName: string, mealType: string): void {
  const dialogRef = this.dialog.open(RecipeSelectorModal, {
    data: { dayName, mealType },
    width: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result && result.selectedRecipe) {
      this.assignRecipeToMeal(result.dayName, result.mealType, result.selectedRecipe);
    }
  });
}

assignRecipeToMeal(dayName: string, mealType: string, recipe: any): void {
  // Inicializar el array si no existe
  if (!this.weekData[dayName]) {
    this.weekData[dayName] = [];
  }

  // Remover cualquier receta existente para esta comida (opcional)
  this.weekData[dayName] = this.weekData[dayName].filter(item => item.meal !== mealType);

  // Agregar la nueva receta
  this.weekData[dayName].push({
    meal: mealType,
    name: recipe.name,
    ingredients: recipe.ingredients,
    time: recipe.time
  });
}
}