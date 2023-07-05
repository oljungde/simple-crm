import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { UserService } from 'src/app/shared/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { PasswordGenerateService } from '../../shared/password-generate.service';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  registerForm: FormGroup;
  emailIsRegistered: boolean = false;
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
    public userService: UserService,
    public authService: AuthService,
    private formBuilder: FormBuilder) {
    const password = this.passwordGenerate.generatePassword();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [password, Validators.required],
      team: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  resetForm() {
    this.userService.newUser = new User();
  }


  dialogClose() {
    this.resetForm();
    this.dialogRef.close();
  }


  saveUser() {
    if (this.registerForm.valid) {
      const newUser = new User();
      Object.assign(newUser, this.registerForm.value);
      this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password)
        .then(() => {
          this.emailIsRegistered = false;
          newUser.fullName = `${newUser.firstName} ${newUser.lastName}`;
          this.userService.saveNewUser(newUser);
          this.resetForm();
          this.dialogRef.close();
        })
        .catch((error) => {
          this.emailIsRegistered = true;
          console.error('Registrierung fehlgeschlagen: ', error);
        });
    } else {
      console.log('Form is invalid');
    }

    // if (this.registerForm.valid) {
    //   const newUser = new User();
    //   Object.assign(newUser, this.registerForm.value);
    //   this.userService.saveNewUser(newUser);
    //   this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password);
    //   this.resetForm();
    //   this.dialogRef.close();
    // } else {
    //   console.log('Form is invalid');
    // }
  }
}