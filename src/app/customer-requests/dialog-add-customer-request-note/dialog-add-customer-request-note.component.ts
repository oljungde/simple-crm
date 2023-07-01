import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../shared/theme.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerRequestsNotesService } from 'src/app/shared/customer-requests-notes.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/user.service';
import { CustomerRequestNote } from 'src/app/models/customer-request-note.class';
import { CustomerRequestsService } from 'src/app/shared/customer-requests.service';

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
    public dialogRef: MatDialogRef<DialogAddCustomerRequestNoteComponent>,
    private formBuilder: FormBuilder,
    public userService: UserService,
    public customerRequestsService: CustomerRequestsService
  ) {
    this.newCustomerRequestNoteForm = this.formBuilder.group({
      note: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  saveCustomerRequestNote() {
    if (this.newCustomerRequestNoteForm.valid) {
      const newCustomerRequestNote = new CustomerRequestNote();
      Object.assign(newCustomerRequestNote, this.newCustomerRequestNoteForm.value);      
      newCustomerRequestNote.userRef = this.userService.userLoggedInId;
      newCustomerRequestNote.customerRequestRef = this.customerRequestsService.customerRequestId;
      this.customerRequestsNotesService.saveNewCustomerRequestNote(newCustomerRequestNote);    
      this.dialogRef.close();
    }
  }
}
