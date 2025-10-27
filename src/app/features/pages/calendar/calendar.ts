import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from "../../../core/layout/header/header";

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

  getMealItems(dayName: string, mealType: string): any[] {
    return this.weekData[dayName]?.filter(item => item.meal === mealType) || [];
  }
}