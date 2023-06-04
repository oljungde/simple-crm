import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service';
import { DatabaseService } from '../database.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordGenerateService } from '../password-generate.service';


@Component({
  selector: 'app-dialog-change-user-login',
  templateUrl: './dialog-change-user-login.component.html',
  styleUrls: ['./dialog-change-user-login.component.scss']
})
export class DialogChangeUserLoginComponent {
  isLightTheme$!: Observable<boolean>;
  changePasswordForm: FormGroup
  hide: boolean = false;


  constructor(
    public authService: AuthService,
    private themeService: ThemeService,
    public databaseService: DatabaseService,
    private passwordGenerate: PasswordGenerateService,
    public dialogRef: MatDialogRef<DialogChangeUserLoginComponent>,
    private formBuilder: FormBuilder) { 
      const password = this.passwordGenerate.generatePassword();
      this.changePasswordForm = this.formBuilder.group({
        newPassword: [password, Validators.required],
        confirmPassword: [password, Validators.required],
      });
    }


  ngOnInit() {
      this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  changeUserPassword() {
    const val = this.changePasswordForm?.value;
    if ((val?.newPassword === val?.confirmPassword) && (val?.newPassword && val?.confirmPassword)) {
      this.authService.passwordChangeError = false;
      this.authService.changeUserPassword(val.newPassword);
      this.dialogRef.close();
    } else {
      console.log('Passwords do not match');
      this.authService.passwordChangeError = true;
    }
  }
}
