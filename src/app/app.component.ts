import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simple-crm';
  isLightTheme$!: Observable<boolean>;

  constructor(private themeService: ThemeService, public authService: AuthService) { }

  ngOnInit() {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  toggleTheme() {
    this.themeService.toggleTheme();
  }
}