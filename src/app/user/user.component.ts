import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { ThemeService } from '../theme.service';
import { DatabaseService } from '../database.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isLightTheme: boolean = false;

    constructor(public dialog: MatDialog, public themeService: ThemeService, public databaseService: DatabaseService) { }


    ngOnInit() {
      this.themeService.isLightTheme$.subscribe(isLightTheme => {
        this.isLightTheme = isLightTheme;
        console.log(this.isLightTheme);
      });
    }


    openDialog(isLightTheme: boolean) {
      this.dialog.open(DialogAddUserComponent, {
        panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
      });
  }
}
