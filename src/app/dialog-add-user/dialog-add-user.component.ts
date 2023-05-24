import { Component, OnInit, inject } from '@angular/core';
import { ThemeService  } from '../theme.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { Firestore, collectionData, collection, addDoc, DocumentReference } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  birthDate: Date | undefined; 
  user = new User();
  firestore: Firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');


  constructor(private themeService: ThemeService) { }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }

  saveUser() {
    this.user.birthDate = this.birthDate?.getTime();
    console.log('Current user is ', this.user);
    addDoc(this.usersCollection, this.user.toJSON())
      .then((docRef: DocumentReference) => {
      console.log('User added successfully', docRef);
    });
  }
}
