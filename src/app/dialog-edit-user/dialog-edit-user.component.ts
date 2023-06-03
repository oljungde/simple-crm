import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DatabaseService } from '../database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.class';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  isLightTheme$!: Observable<boolean>;
  // updateForm: FormGroup | undefined;
  updateForm = this.formBuilder.group({
    firstName: [this.databaseService.user.firstName, Validators.required],
    lastName: [this.databaseService.user.lastName, Validators.required],
    email: [this.databaseService.user.email, [Validators.required, Validators.email]],
    team: [this.databaseService.user.team, Validators.required],
    shortName: [this.databaseService.user.shortName, Validators.required],
  });
  // hide = true;
  teams = [
    'Sales',
    'Marketing',
    'Customer Service',
  ]


  constructor(
    private themeService: ThemeService, 
    public dialogRef: MatDialogRef<DialogEditUserComponent>, 
    public databaseService: DatabaseService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      
    }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
    this.updateForm.controls['email'].disable();
  }


  saveUser() {
    if(this.updateForm.valid) {
      this.updateForm.controls['email'].enable();
      const user = new User();
      Object.assign(user, this.updateForm.value);
      this.databaseService.updateUser(user);
      this.dialogRef.close();
    }
  }
}