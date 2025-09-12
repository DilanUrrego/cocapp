import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Hero } from './shared/components/hero/hero'
import { Features } from './shared/components/features/features'
import { Footer } from './shared/components/footer/footer'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, Features, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cocapp');
}
