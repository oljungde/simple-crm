import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user.class';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  isLightTheme$!: Observable<boolean>;
  loading: boolean = false;
  user: User | undefined;
  userId: string | undefined;
  birthDate: Date | undefined;
  firestore: Firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');


  constructor(private themeService: ThemeService, public dialogRef: MatDialogRef<DialogEditUserComponent>) { }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$; 
    this.birthDate = this.user?.birthDate ? new Date(this.user.birthDate) : undefined;
  }


  saveUser() {
    this.loading = true;
    const docRef = doc(this.usersCollection, this.userId);
    updateDoc(docRef, this.user?.toJSON())
      .then(() => {
        console.log('Document successfully updated! ', this.user);
        this.loading = false;
        this.dialogRef.close();
      });
  }
}