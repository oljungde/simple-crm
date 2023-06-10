import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/theme.service';
import { DatabaseService } from '../../shared/database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CustomerContact } from '../../models/customer-contact.class';

@Component({
  selector: 'app-dialog-edit-customer-contact',
  templateUrl: './dialog-edit-customer-contact.component.html',
  styleUrls: ['./dialog-edit-customer-contact.component.scss']
})
export class DialogEditCustomerContactComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  customerContact: any;
  updateCustomerContactForm!: FormGroup;


  constructor(
    public themeService: ThemeService,
    public databaseService: DatabaseService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditCustomerContactComponent>) { }


  ngOnInit() {
    this.isLightTheme$ = this.themeService.isLightTheme$;
    console.log(this.customerContact);
    this.updateCustomerContactForm = this.formBuilder.group({
      firstName: [this.customerContact.firstName, Validators.required],
      lastName: [this.customerContact.lastName, Validators.required],
      email: [this.customerContact.email, [Validators.required, Validators.email]],
      phone: [this.customerContact.phone, Validators.required],
      position: [this.customerContact.position, Validators.required]
    });
  }


  saveCustomerContact() {
    if(this.updateCustomerContactForm.valid) {
      const customerContact = new CustomerContact();
      customerContact.customerContactId = this.customerContact.customerContactId;
      customerContact.customerRef = this.customerContact.customerRef;   
      Object.assign(customerContact, this.updateCustomerContactForm.value);  
      this.databaseService.updateCustomerContact(customerContact);
      this.dialogRef.close();
    }
  }
}