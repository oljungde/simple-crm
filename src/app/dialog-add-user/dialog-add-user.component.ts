import { Component, OnInit } from '@angular/core';
import { ThemeService  } from '../theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { DatabaseService } from '../database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PasswordGenerateService } from '../password-generate.service';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  registerForm: FormGroup;
  hide = false;
  teams = [
    'Sales',
    'Marketing',
    'Customer Service',
    'IT'
  ]


  constructor(
    private themeService: ThemeService, 
    public dialogRef: MatDialogRef<DialogAddUserComponent>, 
    private passwordGenerate: PasswordGenerateService,
    public databaseService: DatabaseService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      const password = this.passwordGenerate.generatePassword();
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [password, Validators.required],
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
    if (this.registerForm.valid) {
      const newUser = new User();
      Object.assign(newUser, this.registerForm.value);
      this.databaseService.saveNewUser(newUser);
      this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password);
      this.resetForm();
      this.dialogRef.close();
    } else {
      console.log('Form is invalid');
    }
  }
}