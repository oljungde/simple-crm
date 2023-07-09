import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../shared/theme.service';
import { AuthService } from '../shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLightTheme: boolean = false;
  loginForm: FormGroup;
  hide = true;
  userloggedInEmail: string = '';
  loggedInUserId: string = sessionStorage.getItem('loggedInUserId') || '';


  constructor(
    public themeService: ThemeService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public userService: UserService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
  }


  async login() {
    const val = this.loginForm?.value;
    if (val?.email && val?.password) {
      await this.authService.userLogin(val.email, val.password);
      this.userloggedInEmail = val.email;
      this.getUserId(this.userloggedInEmail);
    }
  }


  async getUserId(userloggedInEmail: string) {
    // debugger;
    await this.userService.getUserIdByEmail(userloggedInEmail);
    this.loggedInUserId = this.userService.userLoggedInId
    sessionStorage.setItem('userLoggedInId', this.loggedInUserId);
    console.log('user logged in id is ', this.loggedInUserId);
  }


  loginAsGuest() {
    this.loginForm?.disable();
    this.authService.guestLogin();
    this.getUserId('guest@oliver-jung.dev');
  }
}
