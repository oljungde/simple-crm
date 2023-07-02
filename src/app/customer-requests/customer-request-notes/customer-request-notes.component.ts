import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-request-notes',
  templateUrl: './customer-request-notes.component.html',
  styleUrls: ['./customer-request-notes.component.scss']
})
export class CustomerRequestNotesComponent implements OnInit {
  @Input() note: string = '';
  @Input() user: string = '';
  @Input() date: number | undefined;
  noteDateCreated: string = '';
  
  constructor() { }


  ngOnInit(): void {
    if (this.date) {
      this.noteDateCreated = new Date(this.date).toLocaleDateString();
    }
  }
}
