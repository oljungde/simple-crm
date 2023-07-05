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


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    this.userService.allUsers.subscribe(users => {
      this.filteredUsers = users;
    });
  }


  searchUser() {
    const searchTerm = this.searchInput?.nativeElement.value.toLowerCase();
    this.filteredUsers = this.userService.allUsers$.value.filter((user: any) => {
      return (user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.team.toLowerCase().includes(searchTerm));
    });
  }


  openDialog(isLightTheme: boolean) {
    this.dialog.open(DialogAddUserComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });
  }
}