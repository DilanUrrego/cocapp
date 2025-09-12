import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Hero } from './shared/components/hero/hero'
import { Features } from './shared/components/features/features'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, Features],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cocapp');
}
