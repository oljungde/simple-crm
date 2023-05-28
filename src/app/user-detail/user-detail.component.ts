import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userId: string = '';
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');


  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      console.log(this.userId);
      this.getUser();
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


  async editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
    dialog.afterClosed().subscribe(() => {
      this.getUser();
    });
  }


  async editUserAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
    dialog.afterClosed().subscribe(() => {
      this.getUser();
    });
  }
}