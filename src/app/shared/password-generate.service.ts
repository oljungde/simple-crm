import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordGenerateService {


  constructor() { }


  generatePassword() {
    let result = '';
    let passwordLength = 8;
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log('Password generated: ', result);
    return result;
  }
}
