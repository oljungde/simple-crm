import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs';
import { ThemeService } from '../../shared/theme.service';
import { UserService } from '../../shared/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordGenerateService } from '../../shared/password-generate.service';


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
    public userService: UserService,
    private passwordGenerate: PasswordGenerateService,
    public dialogRef: MatDialogRef<DialogChangeUserLoginComponent>,
    private formBuilder: FormBuilder) {
    const password = this.passwordGenerate.generatePassword();
    this.changePasswordForm = this.formBuilder.group({
      newPassword: [password, Validators.required],
      confirmPassword: [password, Validators.required],
    });
  }


  /**
   * themeService.isLightTheme$ is an Observable<boolean> that is used to determine
   */
  ngOnInit() {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  /**
   * change user password about the authService and close the dialog
   */
  changeUserPassword() {
    const val = this.changePasswordForm?.value;
    if ((val?.newPassword === val?.confirmPassword) && (val?.newPassword && val?.confirmPassword)) {
      this.authService.passwordChangeError = false;
      this.authService.changeUserPassword(val.newPassword);
      this.dialogRef.close();
    } else {
      this.authService.passwordChangeError = true;
    }
  }
}
