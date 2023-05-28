import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { User } from './models/user.class';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  loading: boolean = false;
  user = new User();
  newUser = new User();
  userId: string = '';
  birthDate: Date | undefined; 
  firestore: Firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');
  allUsers: any = [];

  constructor() {
    onSnapshot(this.usersCollection, (changes) => {
      let users: any = [];
      changes.forEach((change) => {
        let userData = change.data();
        userData['id'] = change.id;
        users.push(userData);
      });
      this.allUsers = users;
      console.log('Recieved changes: ', this.allUsers);
    });
  }


  async getUser() {
    this.birthDate = this.user?.birthDate ? new Date(this.user.birthDate) : undefined;
    const docRef = doc(this.usersCollection, this.userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.user = new User(docSnap.data());
      console.log('getUser is: ', this.user);
    } else {
      console.log('No such document!');
    }    
  }


  saveNewUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate?.getTime();
    console.log('Current user is ', this.newUser);
    addDoc(this.usersCollection, this.newUser.toJSON())
      .then((docRef: DocumentReference) => {
      console.log('User added successfully', docRef);
      this.loading = false;
    });
  }


  updateUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate?.getTime();
    const docRef = doc(this.usersCollection, this.userId);
    updateDoc(docRef, this.user?.toJSON())
      .then(() => {
        console.log('Document successfully updated! ', this.user);
        this.loading = false;
      });
  }
}
