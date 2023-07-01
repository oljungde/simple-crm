import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../shared/theme.service';
import { FormGroup } from '@angular/forms';
import { CustomerRequestsNotesService } from 'src/app/shared/customer-requests-notes.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-customer-request-note',
  templateUrl: './dialog-add-customer-request-note.component.html',
  styleUrls: ['./dialog-add-customer-request-note.component.scss']
})
export class DialogAddCustomerRequestNoteComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  newCustomerRequestNoteForm: FormGroup;


  constructor(
    public themeService: ThemeService,
    public customerRequestsNotesService: CustomerRequestsNotesService,
    public dialogRef: MatDialogRef<DialogAddCustomerRequestNoteComponent>
  ) {
    this.newCustomerRequestNoteForm = new FormGroup({

    });
  }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  saveCustomerRequestNote() {
    console.log('saveCustomerRequestNote()');
  }
}
