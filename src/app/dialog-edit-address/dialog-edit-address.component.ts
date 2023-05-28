import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service';
import { User } from '../models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { updateDoc, doc, Firestore, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  loading: boolean = false;
  user: User | undefined;
  userId: string | undefined;
  firestore: Firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');



  constructor(private themeService: ThemeService, public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
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
