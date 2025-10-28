import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-selector-modal',
  standalone: true,
  imports: [],
  templateUrl: './recipe-selector-modal.html',
  styleUrl: './recipe-selector-modal.css'
})
export class RecipeSelectorModal {
  // Datos quemados de recetas (puedes mover esto a un servicio después)
  recipes = [
    { name: 'Sánduche', ingredients: 3, time: 20 },
    { name: 'Lasagna', ingredients: 6, time: 60 },
    { name: 'Chicken Wrap', ingredients: 2, time: 15 },
    { name: 'Ensalada César', ingredients: 5, time: 15 },
    { name: 'Pasta Alfredo', ingredients: 4, time: 25 },
    { name: 'Sopa de Tomate', ingredients: 6, time: 30 }
  ];

  constructor(
    public dialogRef: MatDialogRef<RecipeSelectorModal>,
    @Inject(MAT_DIALOG_DATA) public data: { dayName: string, mealType: string }
  ) {}

  selectRecipe(recipe: any): void {
    this.dialogRef.close({ 
      selectedRecipe: recipe,
      dayName: this.data.dayName,
      mealType: this.data.mealType
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}