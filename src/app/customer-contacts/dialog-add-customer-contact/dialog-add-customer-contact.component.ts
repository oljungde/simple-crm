import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../shared/theme.service';
import { CustomerContactsService } from '../../shared/customer-contacts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerContact } from '../../models/customer-contact.class';

@Component({
  selector: 'app-dialog-add-customer-contact',
  templateUrl: './dialog-add-customer-contact.component.html',
  styleUrls: ['./dialog-add-customer-contact.component.scss']
})
export class DialogAddCustomerContactComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  newCustomerContactForm: FormGroup;
  customerRef: string | undefined;

  constructor(
    private themeService: ThemeService,
    public customerContactsService: CustomerContactsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddCustomerContactComponent>
  ) { 
    this.newCustomerContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.isLightTheme$ = this.themeService.isLightTheme$;
    console.log('add contact ', this.customerRef);
    
  }


  saveCustomerContact() {
    if (this.newCustomerContactForm.valid) {
      const newCustomerContact = new CustomerContact();
      newCustomerContact.customerRef = this.customerRef || '';
      Object.assign(newCustomerContact, this.newCustomerContactForm.value);
      console.log('new customer contact ', newCustomerContact.toJSON);
      this.customerContactsService.saveNewCustomerContact(newCustomerContact);
      if (this.customerRef) {
        this.customerContactsService.getCustomerContacts(this.customerRef);
      }
      this.dialogRef.close();
      console.log('new customer contact saved ', newCustomerContact.toJSON());
    } else {
      console.log('invalid form');
    }
  }
}