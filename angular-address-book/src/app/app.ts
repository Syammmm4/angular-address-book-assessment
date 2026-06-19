import { Component, signal } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-root',
  imports: [ListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-address-book');
}
