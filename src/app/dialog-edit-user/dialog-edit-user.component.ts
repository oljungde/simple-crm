import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  isLightTheme$!: Observable<boolean>;


  constructor(private themeService: ThemeService, public dialogRef: MatDialogRef<DialogEditUserComponent>, public databaseService: DatabaseService) { }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;    
  }

  saveUser() {
    this.databaseService.updateUser();
    this.dialogRef.close();
  }
}