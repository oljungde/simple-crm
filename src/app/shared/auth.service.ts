import { Injectable, OnInit, Inject } from '@angular/core';
import { Auth, signOut, updateEmail, updatePassword } from '@angular/fire/auth';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  isUserLoggedIn: boolean = false;
  isGuestLogin: boolean = false;
  loginError: boolean = false;
  passwordChangeError: boolean = false;
  user: User | null = null;


  constructor(@Inject(Auth) private auth: Auth, private router: Router) { }


  ngOnInit() {
  }


  registerUser(email: string, password: string){
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    createUserWithEmailAndPassword(this.auth, email, password);
  }


  async userLogin(email: string, password: string){
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    console.log(this.loginError);
    this.loginError = false;
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.isUserLoggedIn = true;
      this.user = userCredential.user;
      this.loginError = false;
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.loginError = true;
    }
  }


  async guestLogin(){
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    this.loginError = false;
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, 'guest@oliver-jung.dev', '123456');
      this.isGuestLogin = true;
      this.isUserLoggedIn = true;
      this.user = userCredential.user;
      this.loginError = false;
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.loginError = true;
    }
  }
  

  userSignOut(){
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    signOut(this.auth)
    .then(() => {
      this.isUserLoggedIn = false;
      this.isGuestLogin = false;
      console.log('User signed out!');
    });
  }


  changeUserPassword(newPassword: string){
    console.log(this.user);
    if (this.user) {
      updatePassword(this.user, newPassword)
    }
  }
}
