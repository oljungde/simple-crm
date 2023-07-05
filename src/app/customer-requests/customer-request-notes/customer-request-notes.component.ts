import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-customer-request-notes',
  templateUrl: './customer-request-notes.component.html',
  styleUrls: ['./customer-request-notes.component.scss']
})
export class CustomerRequestNotesComponent implements OnInit {
  @Input() note: string = '';
  @Input() userRef: string = '';
  @Input() date: number | undefined;
  userFullName: string = '';
  noteDateCreated: string = '';


  constructor(private userService: UserService) { }


  async ngOnInit(): Promise<void> {
    if (this.date) {
      this.noteDateCreated = new Date(this.date).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' });
    }
    this.userFullName = await this.userService.getUserFullNameById(this.userRef);
  }
}
