import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../shared/theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../shared/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.class';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  isLightTheme$!: Observable<boolean>;
  updateForm = this.formBuilder.group({
    firstName: [this.userService.user.firstName, Validators.required],
    lastName: [this.userService.user.lastName, Validators.required],
    email: [this.userService.user.email, [Validators.required, Validators.email]],
    team: [this.userService.user.team, Validators.required],
  });
  teams = [
    'Sales',
    'Marketing',
    'Customer Service',
    'IT'
  ];


  constructor(
    private themeService: ThemeService,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    public userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
    this.updateForm.controls['email'].disable();
  }


  saveUser() {
    if (this.updateForm.valid) {
      this.updateForm.controls['email'].enable();
      const user = new User();
      Object.assign(user, this.updateForm.value);
      user.fullName = `${user.firstName} ${user.lastName}`;
      this.userService.updateUser(user);
      this.dialogRef.close();
    }
  }
}