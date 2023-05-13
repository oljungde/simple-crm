import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-crm';
  isLightTheme = true;

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
  }
}
