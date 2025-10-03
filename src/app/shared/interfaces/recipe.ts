export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
  type: 'Orgánico' | 'Procesado' | 'Natural';
}

export interface Recipe {
  id?: string | number;
  name: string;
  mealTime: 'Desayuno' | 'Almuerzo' | 'Cena' | 'Postre' | 'Snack';
  prepTime: number;
  servings: number;
  instructions?: string;
  ingredients: Ingredient[];
  createdAt?: Date;
  updatedAt?: Date;
}