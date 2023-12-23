import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  template: `<app-home />`,
  standalone: true,
  imports: [HomeComponent],
})
export class AppComponent {
  title = 'code-generator';
}
