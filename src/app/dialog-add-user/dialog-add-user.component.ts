import { Component, OnInit, inject } from '@angular/core';
import { ThemeService  } from '../theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  birthDate: Date | undefined; 
  user = new User();
  loading: boolean = false;


  constructor(private themeService: ThemeService, public dialogRef: MatDialogRef<DialogAddUserComponent>) { }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate?.getTime();
    console.log('Current user is ', this.user);
  }
}