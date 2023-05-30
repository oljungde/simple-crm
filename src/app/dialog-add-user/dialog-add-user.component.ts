import { Component, OnInit } from '@angular/core';
import { ThemeService  } from '../theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { DatabaseService } from '../database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  registerForm: FormGroup;
  hide = true;
  teams = [
    'Sales',
    'Marketing',
    'Customer Service',
  ]


  constructor(
    private themeService: ThemeService, 
    public dialogRef: MatDialogRef<DialogAddUserComponent>, 
    public databaseService: DatabaseService, 
    private formBuilder: FormBuilder) {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        team: ['', Validators.required],
        shortName: ['', Validators.required],
      });
    }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  resetForm() {
    this.databaseService.newUser = new User();
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