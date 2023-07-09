import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { ThemeService } from '../../shared/theme.service';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isLightTheme: boolean = false;
  @ViewChild('searchInput') searchInput: ElementRef | undefined;
  filteredUsers: any = [];


  constructor(
    public dialog: MatDialog,
    public themeService: ThemeService,
    public userService: UserService) { }


  /**
   * subscribe to the isLightTheme$ Observable in the themeService
   * and subscribe to the allUsers Observable in the userService
   */
  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    this.userService.allUsers.subscribe(users => {
      this.filteredUsers = users;
    });
  }


  /**
   * searchUser() is called when the user types in the search input
   */
  searchUser() {
    const searchTerm = this.searchInput?.nativeElement.value.toLowerCase();
    this.filteredUsers = this.userService.allUsers$.value.filter((user: any) => {
      return (user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.team.toLowerCase().includes(searchTerm));
    });
  }


  /**
   * opens the DialogAddUserComponent whith this form
   * @param isLightTheme is a boolean that is used to determine the theme of the dialog
   */
  openDialog(isLightTheme: boolean) {
    this.dialog.open(DialogAddUserComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });
  }
}