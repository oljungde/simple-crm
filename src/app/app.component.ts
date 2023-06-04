import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from './theme.service';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogChangeUserLoginComponent } from './dialog-change-user-login/dialog-change-user-login.component';
import { User } from './models/user.class';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simple-crm';
  isLightTheme$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService, 
    public databaseService: DatabaseService,
    public authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  toggleTheme() {
    this.themeService.toggleTheme();
  }

  changePassword() {
    const dialogRef = this.dialog.open(DialogChangeUserLoginComponent);
  }
}