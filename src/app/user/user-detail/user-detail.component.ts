import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    public userService: UserService) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userService.userId = params.get('id') || '';
      console.log(this.userService.userId);
      this.userService.getUser();
    });
  }


  async editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.userService.user = new User(this.userService.user.toJSON());
    dialog.componentInstance.userService.userId = this.userService.userId;
    dialog.afterClosed().subscribe(() => {
      this.userService.getUser();
    });
  }
}