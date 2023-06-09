import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from '../theme.service';
import { Customer } from '../models/customer.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-customer',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.scss']
})
export class DialogEditCustomerComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  updateCustomerForm = this.formBuilder.group({
    name: [this.databaseService.customer.name, Validators.required],
    street: [this.databaseService.customer.street, Validators.required],
    zipCode: [this.databaseService.customer.zipCode, Validators.required],
    city: [this.databaseService.customer.city, Validators.required],
    phone: [this.databaseService.customer.phone, Validators.required],
    homepage: [this.databaseService.customer.homepage],
    email: [this.databaseService.customer.email, [Validators.required, Validators.email]],
  });


  constructor(
    public databaseService: DatabaseService,
    private themeService: ThemeService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditCustomerComponent>) { }
    
    
  ngOnInit() {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  saveCustomer() {
    if (this.updateCustomerForm.valid) {
      const customer = new Customer();
      Object.assign(customer, this.updateCustomerForm.value);
      this.databaseService.updateCustomer(customer);
      this.dialogRef.close();
    }
  }
}