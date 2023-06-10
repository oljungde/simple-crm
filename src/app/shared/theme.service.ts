import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _isLightTheme = new BehaviorSubject<boolean>(this.getInitialTheme());
  isLightTheme$ = this._isLightTheme.asObservable();

  constructor() {
    this.isLightTheme$.subscribe(isLightTheme => {
      const body = document.body;
      if (isLightTheme) {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
      } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
      }
    });
  }


  private getInitialTheme() {
    let theme = localStorage.getItem('theme');
    if (theme === null) {
      localStorage.setItem('theme', 'light');
      return true;
    } else {
      return theme === 'light' ? true : false;
    }
  }


  toggleTheme() {
    let nextTheme = !this._isLightTheme.value;
    this._isLightTheme.next(nextTheme);
    localStorage.setItem('theme', nextTheme ? 'light' : 'dark');
  }
}