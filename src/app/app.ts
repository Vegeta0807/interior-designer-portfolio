import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { About } from './components/about/about';
import { Portfolio } from './components/portfolio/portfolio';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  imports: [Header, About, Portfolio, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
