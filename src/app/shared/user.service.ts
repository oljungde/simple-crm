import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.class';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loading: boolean = false;
  user = new User();
  newUser = new User();
  userId: string = '';
  firestore: Firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');
  allUsers$ = new BehaviorSubject<any[]>([]);
  allUsers = this.allUsers$.asObservable();
  userLoggedInId: any;
  userLoggedInFullName: any;

  constructor() {
    this.observeUsers();
  }


  observeUsers() {
    onSnapshot(this.usersCollection, (changes) => {
      let users: any = [];
      changes.forEach((change) => {
        let userData = change.data();
        userData['id'] = change.id;
        users.push(userData);
      });
      this.allUsers$.next(users);
      console.log('Recieved user changes: ', this.allUsers$.value);
    });
  }


  async getUser() {
    const docRef = doc(this.usersCollection, this.userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.user = new User(docSnap.data());
      console.log('getUser is: ', this.user);
    } else {
      console.log('No such document!');
    } 
  }


  async getUserIdByEmail(email: string) {
    const usersQuery = query(this.usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(usersQuery);
    querySnapshot.forEach((doc) => {
        console.log('doc.id  => ', doc.data());
        console.log('User ID is: ', doc.id);
        this.userLoggedInId = doc.id;
    });
}


async getUserFullNameById(userId: string) {
  const docRef = doc(this.usersCollection, userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data()['fullName'];
  } else {
    console.log('No such document!');
  }
}


  saveNewUser(newUser?: User) {
    this.loading = true;
    const userToSave = newUser ? newUser : this.newUser;
    console.log('Current user is ', this.newUser);
    addDoc(this.usersCollection, userToSave.toJSON())
      .then((docRef: DocumentReference) => {
        console.log('User added successfully', docRef);
        this.userId = docRef.id;
        updateDoc(docRef, {userId: docRef.id});
        this.loading = false;
    });
  }


  updateUser(user?: User) {
    this.loading = true;
    const docRef = doc(this.usersCollection, this.userId);
    updateDoc(docRef, user?.toJSON())
      .then(() => {
        this.userId = docRef.id;
        updateDoc(docRef, {userId: docRef.id});
        console.log('Document successfully updated! ', this.user);
        this.loading = false;
      });
  }
}