export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
  type: 'Orgánico' | 'Procesado' | 'Natural';
}

export interface Recipe {
  id?: string | number; // Opcional para nuevas recetas
  name: string;
  mealTime: 'Desayuno' | 'Almuerzo' | 'Cena' | 'Postre' | 'Snack';
  prepTime: number;
  servings: number;
  instructions?: string; // Opcional
  ingredients: Ingredient[];
  createdAt?: Date; // Opcional - para fecha de creación
  updatedAt?: Date; // Opcional - para fecha de actualización
}