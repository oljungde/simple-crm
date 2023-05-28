import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service';
import { User } from '../models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { updateDoc, doc, Firestore, collection } from '@angular/fire/firestore';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;


  constructor(private themeService: ThemeService, public dialogRef: MatDialogRef<DialogEditAddressComponent>, public databaseService: DatabaseService) { }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  saveUser() {
    this.databaseService.updateUser();
    this.dialogRef.close();
  }
}
