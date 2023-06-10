import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DatabaseService } from '../../shared/database.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    public databaseService: DatabaseService) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.databaseService.userId = params.get('id') || '';
      console.log(this.databaseService.userId);
      this.databaseService.getUser();
    });
  }


  async editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.databaseService.user = new User(this.databaseService.user.toJSON());
    dialog.componentInstance.databaseService.userId = this.databaseService.userId;
    dialog.afterClosed().subscribe(() => {
      this.databaseService.getUser();
    });
  }
}