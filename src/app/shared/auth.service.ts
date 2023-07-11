import { Injectable, OnInit, Inject } from '@angular/core';
import { Auth, signOut, updatePassword } from '@angular/fire/auth';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(sessionStorage.getItem('isUserLoggedIn') === 'true');
  isGuestLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(sessionStorage.getItem('isGuestLogin') === 'true');
  loginError: boolean = false;
  passwordChangeError: boolean = false;
  user: User | null = null;


  constructor(@Inject(Auth) private auth: Auth, private router: Router) { }


  ngOnInit() {
  }


  /**
   * function to register a new user in firebase auth
   * @param email adress of the user to register
   * @param password of the user to register
   * @returns 
   */
  registerUser(email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.auth) {
        console.error('Firebase has not been initialized yet.');
        reject('Firebase has not been initialized yet.');
        return;
      }
      this.createUser(email, password);
    });
  }


  /**
   * create a new user in firebase auth
   * @param email adress of the user to register
   * @param password of the user to register
   */
  createUser(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        resolve();
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.error('Email already in use');
          reject('Email already in use');
        } else {
          console.error(error);
        }
        reject(error);
      });
  }


  async userLogin(email: string, password: string) {
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    console.log(this.loginError);
    this.loginError = false;
    try {
      this.signIn(email, password);
    } catch (error) {
      this.loginError = true;
    }
  }


  /**
   * sign in the user with email and password with firebase auth, and navigate to the dashboard
   */
  async signIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    sessionStorage.setItem('isUserLoggedIn', 'true');
    this.isUserLoggedIn.next(true);
    this.loginError = false;
    this.router.navigate(['/dashboard']);
  }


  /**
   * check if the user to login is a guest and login the guest
   * @returns 
   */
  async guestLogin() {
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    this.loginError = false;
    try {
      this.authGuestLogin();
    } catch (error) {
      this.loginError = true;
    }
  }


  /**
   * login the guest with firebase auth, and navigate to the dashboard
   */
  async authGuestLogin() {
    const userCredential = await signInWithEmailAndPassword(this.auth, 'guest@oliver-jung.dev', '123456');
    sessionStorage.setItem('isGuestLogin', 'true');
    this.isGuestLogin.next(true);
    sessionStorage.setItem('isUserLoggedIn', 'true');
    this.isUserLoggedIn.next(true);
    this.user = userCredential.user;
    this.loginError = false;
    this.router.navigate(['/dashboard']);
  }


  /**
   * sign out the user and navigate to the login page
   * @returns 
   */
  userSignOut() {
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    signOut(this.auth)
      .then(() => {
        sessionStorage.removeItem('isUserLoggedIn');
        this.isUserLoggedIn.next(false);
        sessionStorage.removeItem('userLoggedInId');
        sessionStorage.removeItem('isGuestLogin');
        this.isGuestLogin.next(false);
        this.router.navigate(['/login']);
      });
  }


  /**
   * change the password of the user
   * @param newPassword is the new password for the user
   */
  changeUserPassword(newPassword: string) {
    if (this.user) {
      updatePassword(this.user, newPassword)
    }
  }
}


function resolve() {
  throw new Error('Function not implemented.');
}


function reject(arg0: string) {
  throw new Error('Function not implemented.');
}