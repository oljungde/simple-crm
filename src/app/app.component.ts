import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simple-crm';
  isLightTheme: boolean | undefined;

  ngOnInit() {
    let theme = localStorage.getItem('theme');
    if (theme === null) {
      localStorage.setItem('theme', 'light');
      this.isLightTheme = true;
    } else {
      this.isLightTheme = theme === 'light' ? true : false;
    }    
  }


  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    localStorage.setItem('theme', this.isLightTheme ? 'light' : 'dark');
  }
}
