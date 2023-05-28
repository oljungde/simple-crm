import { Component, OnInit } from '@angular/core';
import { ThemeService  } from '../theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;


  constructor(private themeService: ThemeService, public dialogRef: MatDialogRef<DialogAddUserComponent>, public databaseService: DatabaseService) { }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  resetForm() {
    this.databaseService.newUser = new User();
    this.databaseService.birthDate = undefined;
  }


  dialogClose() {
    this.resetForm();
    this.dialogRef.close();
  }


  saveUser() {
    this.databaseService.saveNewUser();
    this.resetForm();
    this.dialogRef.close();
  }
}