import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../shared/theme.service';
import { AuthService } from '../shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLightTheme: boolean = false;
  loginForm: FormGroup;
  hide = true;
  

  constructor(public themeService: ThemeService, public authService: AuthService, private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
      // console.log(this.isLightTheme);
    });
  }


  login() {
    const val = this.loginForm?.value;
    if (val?.email && val?.password) {
      this.authService.userLogin(val.email, val.password);
    }
  }


  loginAsGuest() {
    this.loginForm?.disable();
    this.authService.guestLogin();
  }
}
