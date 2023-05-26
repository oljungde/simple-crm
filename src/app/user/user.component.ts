import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { ThemeService } from '../theme.service';
import { User } from '../models/user.class';
import { Firestore, collection, doc, getDocs, onSnapshot } from '@angular/fire/firestore';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isLightTheme: boolean = false;
  user = new User();
  firestore: Firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');
  allUsers: any = [];

    
    constructor(public dialog: MatDialog, public themeService: ThemeService) { 
      onSnapshot(this.usersCollection, (changes) => {
        let users: any = [];
        changes.forEach((change) => {
          users.push(change.data());
        });
        this.allUsers = users;
        console.log('Recieved changes: ', this.allUsers);
      });
    }


    async ngOnInit() {
      this.themeService.isLightTheme$.subscribe(isLightTheme => {
        this.isLightTheme = isLightTheme;
      });
    }


    openDialog(isLightTheme: boolean) {
      this.dialog.open(DialogAddUserComponent, {
        panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
      });
  }
}
