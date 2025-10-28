import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from "../../../core/layout/header/header";

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './market.html',
  styleUrls: ['./market.css']
})
export class Market {
  shoppingList = {
    confirmed: 0,
    total: 5,
    categories: [
      {
        name: 'Orgánico',
        icon: '🥬',
        color: '#FFF0E5',
        items: [
          { name: '1 paquete Albahaca', recipes: ['Lasaña'], checked: false }
        ]
      },
      {
        name: 'Lácteos',
        icon: '🥛',
        color: '#FFF0E5',
        items: [
          { name: '1 paquete Queso', recipes: ['Lasaña', 'Sánduche'], checked: false }
        ]
      },
      {
        name: 'Carne',
        icon: '🥩',
        color: '#FFF0E5',
        items: [
          { name: '10 unidades Pollo', recipes: ['Lasaña', 'Wrap de Pollo'], checked: false },
          { name: '2 libras Res', recipes: ['Lasaña'], checked: false }
        ]
      },
      {
        name: 'Despensa',
        icon: '🧂',
        color: '#FFF0E5',
        items: [
          { name: '1 Sobre Salsa de Tomate', recipes: ['Lasaña', 'Sánduche'], checked: false }
        ]
      }
    ]
  };

  toggleItem(categoryIndex: number, itemIndex: number): void {
    const item = this.shoppingList.categories[categoryIndex].items[itemIndex];
    item.checked = !item.checked;
    this.updateConfirmedCount();
  }

  updateConfirmedCount(): void {
    let count = 0;
    this.shoppingList.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.checked) count++;
      });
    });
    this.shoppingList.confirmed = count;
  }

  getProgressPercentage(): number {
    return (this.shoppingList.confirmed / this.shoppingList.total) * 100;
  }
}
